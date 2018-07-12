import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import OkrCard from '../../containers/OkrCard';
import OkrLink from './OkrLink';
import { Card, Segment, Header, Button } from 'semantic-ui-react';
import { List, Set, OrderedMap } from 'immutable';

class OkrMap extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      visibleIds: null, // OrderedMap<ObjectiveId, Set<KeyResultId>>
      links: List(), // List<OkrLink.props>
      groups: List(), // List<objectives>
      rootObjective: null,
    };
    this.onResize = () => this.updateOkrLinks(this.state);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.objective) return

    if (!this.props.objective || this.props.objective.get('id') !== nextProps.objective.get('id')
      || this.props.objective.get('parentKeyResultId') !== nextProps.objective.get('parentKeyResultId')) {
      this.createGroups(nextProps.objective);
    } else if (this.props.objective !== nextProps.objective) {
      this.createGroups(nextProps.objective, this.state.visibleIds);
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
  createGroups(objective, visibleIds = this.getInitialVisibleIds(objective)) {
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
    let groups;
    if (visibleIds.isEmpty()) {
      // 表示リストが空の場合はルート要素のみ表示する (子は表示しない)
      rootObjective = this.state.rootObjective;
      groups = List.of(List.of(rootObjective));
    } else {
      rootObjective = findRoot(objective, visibleIds.keySeq().first());
      groups = collectDescendants(List.of(List.of(rootObjective)), rootObjective);
    }
    this.setState({ visibleIds, groups, rootObjective, links: List() })
  }

  // 構築した Objective リストから OKR リンク情報を生成する
  updateOkrLinks({ groups }) {
    // O/KR ID からなるリンク情報の生成
    const idLinks = groups.reduce((result, objectives) => {
      if (result.isEmpty()) {
        // ルート要素に親がいる場合は親とのリンクを追加する
        const rootObjective = objectives.first();
        const parentKeyResultId = rootObjective.get('parentKeyResultId');
        if (parentKeyResultId) {
          result = result.push({
            fromId: rootObjective.getIn(['parentKeyResult', 'objectiveId']),
            paths: List.of({
              toIds: List.of(rootObjective.get('id')),
              fromKeyResultId: parentKeyResultId,
            }),
          });
        }
      }

      // 子がいる場合は子とのリンクを追加する
      objectives.forEach(objective => {
        const keyResults = objective.get('keyResults').filterNot(keyResult => keyResult.get('childObjectiveIds').isEmpty())
        if (!keyResults.isEmpty()) {
          result = result.push({
            fromId: objective.get('id'),
            paths: keyResults.map(keyResult => ({
              toIds: keyResult.get('childObjectiveIds'),
              fromKeyResultId: keyResult.get('id'),
            })),
          });
        }
      });

      return result;
    }, List());

    // ID リンクから ref 付きのリンク情報に変換する
    const links = idLinks.map(link => ({
      fromId: link.fromId,
      fromRef: this.refs[`objective_${link.fromId}`],
      paths: link.paths.map(path => ({
        toIds: path.toIds,
        toRefs: path.toIds.map(toId => this.refs[`objective_${toId}`]),
        fromKeyResultId: path.fromKeyResultId,
      })),
    }))
    this.setState({ links })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdateではsetStateするべきではないが、コンポーネント間のパスを描画するには
    // コンポーネントをいったん描画してDOMの位置情報を取得する必要があるため許容する
    if (prevState.groups !== this.state.groups) { // 展開/折り畳みによる再描画
      this.updateOkrLinks(this.state);
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
    this.createGroups(this.state.rootObjective, visibleIds);
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
    this.createGroups(this.state.rootObjective, visibleIds);
  }

  getSwitchedVisibleIds = (objectiveId, keyResultIds) => {
    // 表示系統を切り替えるため親の ID を検索する
    const parentId = this.state.groups
      .find(objectives => objectives.some(objective => objective.get('id') === objectiveId))
      .first().getIn(['parentKeyResult', 'objectiveId']);
    const index = this.state.visibleIds.keySeq().findIndex(id => id === parentId);
    return this.state.visibleIds.take(index + 1).set(objectiveId, keyResultIds);
  }

  emptyView() {
    return (
      <Segment compact padded="very" textAlign="center" className="okr-map__empty">
        <Header as="h4">Objective がありません</Header>
        <Button icon="plus" content="OKR を作成する" onClick={this.props.openObjectiveModal} />
      </Segment>
    )
  }

  render() {
    const { objective, isFetchedObjectives } = this.props
    if (!objective) {
      return isFetchedObjectives ? this.emptyView() : null
    }
    return (
      <div className='okr-map'>
        {this.state.groups.map((objectives, key) => (
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
        {this.state.links.map((link, key) => (
          <OkrLink key={key} {...link} onToggleObjective={this.toggleObjective} />
        ))}
      </div>
    );
  }
}

OkrMap.propTypes = {
  // container
  objective: ImmutablePropTypes.map,
  isFetchedObjectives: PropTypes.bool.isRequired,
  fetchObjective: PropTypes.func.isRequired,
  fetchObjectiveByKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  // component
};

export default OkrMap;
