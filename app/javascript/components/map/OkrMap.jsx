import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import OkrCard from '../../containers/OkrCard';
import OkrPath from './OkrPath';
import { Card } from 'semantic-ui-react';
import { List, Set, OrderedMap } from 'immutable';

class OkrMap extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibleIds: null, // OrderedMap<ObjectiveId, Set<KeyResultId>>
      okrPathPropsList: null,
      objectivesList: null,
      rootObjective: null,
    };
    this.onResize = () => this.updateOkrPathProps(this.state);
  }

  componentWillMount() {
    this.createObjectivesList(this.props.objective);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective.get('id') !== nextProps.objective.get('id')
      || this.props.objective.get('parentKeyResultId') !== nextProps.objective.get('parentKeyResultId')) {
      this.createObjectivesList(nextProps.objective);
    } else if (this.props.objective !== nextProps.objective) {
      this.createObjectivesList(nextProps.objective, this.state.visibleIds);
    }
  }

  // 初期表示リスト (基点 Objective とその KR)
  getInitialVisibleIds(objective) {
    return OrderedMap([[
      objective.get('id'), objective.get('keyResultIds').toSet()
    ]]);
  }

  // 基点 Objective と表示リストから上下方向に展開される Objective リストを構築する
  // ex. [[O1], [O2, O3], [O4, O5, O6], ...]
  createObjectivesList(objective, visibleIds = this.getInitialVisibleIds(objective)) {
    const findRoot = (objective, rootId) => {
      if (objective.get('id') === rootId) {
        return objective;
      } else {
        const parentKeyResult = objective.get('parentKeyResult');
        if (parentKeyResult) {
          const parent = parentKeyResult.get('objective');
          if (parent) {
            return findRoot(parent, rootId);
          } else {
            // 他人の親 Objective (未 fetch) の場合
            this.props.fetchObjective(parentKeyResult.get('objectiveId'));
          }
        } else {
          // 他人の親 KR (未 fetch) の場合
          this.props.fetchObjectiveByKeyResult(objective.get('parentKeyResultId'));
        }
        return objective;
      }
    };

    const collectDescendants = (result, objective) => {
      const keyResults = objective.get('keyResults');
      const childObjectiveIds = keyResults.flatMap(keyResult => keyResult.get('childObjectiveIds'));
      if (!childObjectiveIds.isEmpty()) {
        let childObjectives = keyResults.flatMap(keyResult => keyResult.get('childObjectives'));
        if (childObjectiveIds.size === childObjectives.size) {
          // 親 KR が展開されている子 Objective のみに絞り込む
          const visibleKeyResultIds = visibleIds.get(objective.get('id')) || Set();
          childObjectives = childObjectives.filter(objective => visibleKeyResultIds.includes(objective.get('parentKeyResultId')));
          result = result.push(childObjectives);
          // 子 Objective をさらに展開するかどうかチェックする
          const child = childObjectives.find(objective => visibleIds.has(objective.get('id')));
          if (child) {
            result = collectDescendants(result, child);
          }
        } else {
          // 他人の子 Objective (未 fetch) が含まれている場合
          this.props.fetchObjective(objective.get('id'));
        }
      }
      return result;
    };

    let rootObjective;
    let objectivesList;
    if (visibleIds.isEmpty()) {
      // 表示リストが空の場合はルート要素のみ表示する (子は表示しない)
      rootObjective = this.state.rootObjective;
      objectivesList = List.of(List.of(rootObjective));
    } else {
      rootObjective = findRoot(objective, visibleIds.keySeq().first());
      objectivesList = collectDescendants(List.of(List.of(rootObjective)), rootObjective);
    }
    this.setState({
      visibleIds: visibleIds,
      objectivesList: objectivesList,
      rootObjective: rootObjective,
    });
  }

  // 構築した Objective リストから OKR パス情報を生成する
  updateOkrPathProps({ objectivesList }) {
    // リンク関係の構築
    const links = objectivesList.reduce((result, objectives) => {
      if (result.isEmpty()) {
        // ルート要素に親がいる場合は親とのリンクを追加する
        const rootObjective = objectives.first();
        const parentKeyResultId = rootObjective.get('parentKeyResultId');
        if (parentKeyResultId) {
          result = result.push({
            fromId: rootObjective.getIn(['parentKeyResult', 'objectiveId']),
            toIds: objectives.map(objective => objective.get('id')),
            fromKeyResultIds: Set.of(parentKeyResultId),
          });
        }
      }

      // 子がいる場合は子とのリンクを追加する
      objectives.forEach(objective => {
        const childObjectiveIds = objective.get('keyResults').flatMap(keyResult => keyResult.get('childObjectiveIds'));
        if (!childObjectiveIds.isEmpty()) {
          result = result.push({
            fromId: objective.get('id'),
            toIds: childObjectiveIds,
            fromKeyResultIds: objective.get('keyResultIds').toSet(),
          });
        }
      });

      return result;
    }, List());

    // リンク関係からパス情報を作成
    const okrPathPropsList = links.map(link => ({
      fromRef: this.refs[`objective_${link.fromId}`],
      toRefs: link.toIds.map(toId => this.refs[`objective_${toId}`]),
      objectiveId: link.fromId,
      keyResultIds: link.fromKeyResultIds,
    }))

    this.setState({
      okrPathPropsList: okrPathPropsList,
    });
  }

  componentDidMount() {
    this.updateOkrPathProps(this.state);
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdateではsetStateするべきではないが、コンポーネント間のパスを描画するには
    // コンポーネントをいったん描画してDOMの位置情報を取得する必要があるため許容する
    if (prevState.objectivesList !== this.state.objectivesList) { // 展開/折り畳みによる再描画
      this.updateOkrPathProps(this.state);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  toggleObjective = (toAncestor, isExpanded, objectiveId, keyResultIds) => {
    let visibleIds;
    if (isExpanded) {
      // Objective が展開されている → 折り畳む
      const index = this.state.visibleIds.keySeq().findIndex(id => id === objectiveId);
      if (toAncestor) {
        visibleIds = this.state.visibleIds.skip(index + 1);
      } else {
        visibleIds = this.state.visibleIds.take(index);
      }
    } else {
      // Objective が折り畳まれている → 展開する
      if (toAncestor) {
        visibleIds = OrderedMap([[objectiveId, keyResultIds]]).merge(this.state.visibleIds);
      } else {
        visibleIds = this.getSwitchedVisibleIds(objectiveId, keyResultIds);
      }
    }
    this.createObjectivesList(this.state.rootObjective, visibleIds);
  }

  toggleKeyResult = (objectiveId, keyResultId, isToggleOn) => {
    let visibleIds;
    if (isToggleOn) {
      // KR が展開されている → 折り畳む
      visibleIds = this.state.visibleIds.update(objectiveId, keyResultIds => keyResultIds.delete(keyResultId));
      if (visibleIds.get(objectiveId).isEmpty()) {
        // 全ての KR を折り畳んだ場合は Objective も折り畳む
        const index = visibleIds.keySeq().findIndex(id => id === objectiveId);
        visibleIds = visibleIds.take(index);
      }
    } else {
      // KR が折り畳まれている → 展開する
      if (this.state.visibleIds.has(objectiveId)) {
        visibleIds = this.state.visibleIds.update(objectiveId, keyResultIds => keyResultIds.add(keyResultId));
      } else {
        // 最初の KR を展開した場合は Objective も展開する 
        visibleIds = this.getSwitchedVisibleIds(objectiveId, Set.of(keyResultId));
      }
    }
    this.createObjectivesList(this.state.rootObjective, visibleIds);
  }

  getSwitchedVisibleIds = (objectiveId, keyResultIds) => {
    // 表示系統を切り替えるため親の ID を検索する
    const parentId = this.state.objectivesList
      .find(objectives => objectives.some(objective => objective.get('id') === objectiveId))
      .first().getIn(['parentKeyResult', 'objectiveId']);
    const index = this.state.visibleIds.keySeq().findIndex(id => id === parentId);
    return this.state.visibleIds.take(index + 1).set(objectiveId, keyResultIds);
  }

  render() {
    return (
      <div className='okr-map'>
        {this.state.objectivesList && this.state.objectivesList.map((objectives, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {objectives
              .reduce((result, objective, index) => (
                // OKR カードをペアにする (2個ずつ折り返すため)
                index % 2 === 0 ? result.push(List.of(objective)) : result.pop().push(result.last().push(objective))
              ), List())
              .map((objectivePair, key) => (
                <div className="okr-map__pair" key={key}>
                  {objectivePair.map(objective => (
                    <OkrCard
                      key={objective.get('id')}
                      objective={objective}
                      ref={`objective_${objective.get('id')}`}
                      visibleKeyResultIds={this.state.visibleIds.get(objective.get('id'))}
                      onToggleKeyResult={this.toggleKeyResult}
                    />
                  ))}
                </div>
              ))}
          </Card.Group>
        ))}
        {this.state.okrPathPropsList && this.state.okrPathPropsList.map((okrPathProps, key) => (
          <OkrPath key={key} {...okrPathProps} onToggleObjective={this.toggleObjective} />
        ))}
      </div>
    );
  }
}

OkrMap.propTypes = {
  // container
  fetchObjective: PropTypes.func.isRequired,
  fetchObjectiveByKeyResult: PropTypes.func.isRequired,
  // component
  objective: ImmutablePropTypes.map.isRequired,
};

export default OkrMap;
