import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import OkrCard from '../../containers/OkrCard';
import OkrPath from './OkrPath';
import { Card } from 'semantic-ui-react';
import { List, Set, OrderedMap } from 'immutable';

class OkrMap extends Component {

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
            parentKeyResultId: parentKeyResultId,
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
            keyResultIds: objective.get('keyResultIds'),
          });
        }
      });

      return result;
    }, List());

    // リンク関係からパス情報を作成
    const okrPathPropsList = links.map(link => {
      let collapsedParent = false;
      let expandedChild = false;

      let fromPoint;
      const fromRef = this.refs[`objective_${link.fromId}`];
      if (fromRef) {
        const element = findDOMNode(fromRef);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        fromPoint = { x: x, y: element.offsetTop + element.offsetHeight };
      } else {
        collapsedParent = true;
        fromPoint = { x: 0, y: 0 };
      }

      let toPoints = link.toIds.reduce((result, toId) => {
        const toRef = this.refs[`objective_${toId}`];
        if (toRef) {
          const element = findDOMNode(toRef);
          const x = element.offsetLeft + (element.offsetWidth / 2);
          expandedChild = true;
          result = result.push({ x: x, y: element.offsetTop });
        }
        return result;
      }, List());
      if (toPoints.isEmpty()) {
        toPoints = toPoints.push({ x: 0, y: 0 });
      }

      const mapElement = findDOMNode(this.refs.map);
      return {
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight,
        fromPoint: fromPoint,
        toPoints: toPoints,
        toAncestor: collapsedParent,
        isExpanded: !collapsedParent && expandedChild,
        fromId: link.fromId,
        parentKeyResultId: link.parentKeyResultId,
        keyResultIds: link.keyResultIds,
      };
    });

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

  toggleObjective = ({ toAncestor, isExpanded, fromId, parentKeyResultId, keyResultIds }) => {
    let visibleIds;
    if (isExpanded) {
      // Objective が展開されている → 折り畳む
      const index = this.state.visibleIds.keySeq().findIndex(id => id === fromId);
      if (toAncestor) {
        visibleIds = this.state.visibleIds.skip(index + 1);
      } else {
        visibleIds = this.state.visibleIds.take(index);
      }
    } else {
      // Objective が折り畳まれている → 展開する
      if (toAncestor) {
        visibleIds = OrderedMap([[fromId, Set.of(parentKeyResultId)]]).merge(this.state.visibleIds);
      } else {
        visibleIds = this.getSwitchedVisibleIds(fromId, keyResultIds.toSet());
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
      <div className='okr-map' ref='map'>
        {this.state.objectivesList && this.state.objectivesList.map((objectives, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {objectives.map((objective, key) => (
              <OkrCard
                key={key}
                objective={objective}
                ref={`objective_${objective.get('id')}`}
                visibleKeyResultIds={this.state.visibleIds.get(objective.get('id'))}
                onToggleKeyResult={this.toggleKeyResult}
              />
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
  objective: PropTypes.object.isRequired,
};

export default OkrMap;
