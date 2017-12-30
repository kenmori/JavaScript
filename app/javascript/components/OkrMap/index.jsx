import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import OkrCard from '../../containers/OkrCard';
import OkrPath from './OkrPath';
import { Card } from 'semantic-ui-react';
import { List } from 'immutable'

class OkrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibleIds: null,
      okrPathPropsList: null,
      objectivesList: null,
      rootObjective: null,
    };
  }

  componentWillMount() {
    this.createObjectivesList(this.props.objective);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective !== nextProps.objective) {
      this.createObjectivesList(nextProps.objective);
    }
  }

  createObjectivesList(objective, visibleIds = List.of(objective.get('id'))) {
    const findRoot = (objective, rootId) => {
      if (objective.get('id') === rootId) {
        return objective;
      } else {
        const parentId = objective.get('parentObjectiveId');
        // FIXME: this.props.objectives には自分の Objective しかないため他人が責任者の Objective を取得できない
        const parent = this.props.objectives.find(objective => objective.get('id') === parentId)
        return findRoot(parent, rootId);
      }
    };

    const collectDescendants = (result, objective) => {
      const childObjectives = objective.get('childObjectives');
      if (!childObjectives.isEmpty()) {
        result = result.push(childObjectives);
        const child = childObjectives.find(objective => visibleIds.includes(objective.get('id')))
        if (child) {
          result = collectDescendants(result, child);
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
      rootObjective = findRoot(objective, visibleIds.first());
      objectivesList = collectDescendants(List.of(List.of(rootObjective)), rootObjective);
    }
    this.setState({
      visibleIds: visibleIds,
      objectivesList: objectivesList,
      rootObjective: rootObjective,
    });
  }

  updateOkrPathProps({ objectivesList }) {
    // リンク情報の構築
    const links = objectivesList.reduce((result, objectives) => {
      if (result.isEmpty()) {
        // ルート要素に親がいる場合は親とのリンクを追加する
        const parentId = objectives.first().get('parentObjectiveId');
        if (parentId) {
          result = result.push({
            fromId: parentId,
            toIds: objectives.map(objective => objective.get('id')),
          });
        }
      }

      // 子がいる場合は子とのリンクを追加する
      objectives.forEach(objective => {
        const childObjectives = objective.get('childObjectives');
        if (!childObjectives.isEmpty()) {
          result = result.push({
            fromId: objective.get('id'),
            toIds: childObjectives.map(objective => objective.get('id')),
          });
        }
      });

      return result;
    }, List());

    // リンク情報からパス情報を作成
    const okrPathPropsList = links.map(link => {
      let collapsedParent = false;
      let collapsedChild = false;

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

      const toPoints = link.toIds.map(toId => {
        const toRef = this.refs[`objective_${toId}`];
        if (toRef) {
          const element = findDOMNode(toRef);
          const x = element.offsetLeft + (element.offsetWidth / 2);
          return { x: x, y: element.offsetTop };
        } else {
          collapsedChild = true;
          return { x: 0, y: 0 };
        }
      });

      const mapElement = findDOMNode(this.refs.map);
      return {
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight,
        fromPoint: fromPoint,
        toPoints: toPoints,
        toAncestor: collapsedParent,
        isExpanded: !collapsedParent && !collapsedChild,
        targetId: link.fromId,
      };
    });

    this.setState({
      okrPathPropsList: okrPathPropsList,
    });
  }

  componentDidMount() {
    this.updateOkrPathProps(this.state);
    window.addEventListener('resize', () => this.updateOkrPathProps(this.state));
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdateではsetStateするべきではないが、コンポーネント間のパスを描画するには
    // コンポーネントをいったん描画してDOMの位置情報を取得する必要があるため許容する
    if ((prevProps.users.isEmpty() && !this.props.users.isEmpty()) // アバター表示により OkrCard の高さが変わるため再描画
      || (prevState.objectivesList !== this.state.objectivesList)) { // 展開/折り畳みによる再描画
      this.updateOkrPathProps(this.state);
    }
  }

  updateObjectivesList({ toAncestor, isExpanded, targetId }) {
    let visibleIds;
    if (isExpanded) {
      const index = this.state.visibleIds.indexOf(targetId);
      if (toAncestor) {
        visibleIds = this.state.visibleIds.skip(index + 1);
      } else {
        visibleIds = this.state.visibleIds.take(index);
      }
    } else {
      if (toAncestor) {
        visibleIds = this.state.visibleIds.unshift(targetId);
      } else {
        // 表示系統を切り替えるため親の ID を検索する
        const parentId = this.state.objectivesList.find(objectives =>
          objectives.some(objective => objective.get('id') === targetId))
          .first().get('parentObjectiveId');
        const index = this.state.visibleIds.indexOf(parentId);
        visibleIds = this.state.visibleIds.take(index + 1).push(targetId);
      }
    }
    this.createObjectivesList(this.props.objective, visibleIds);
  }

  render() {
    const selectedId = this.props.objective.get('id');
    return (
      <div className='okr-map' ref='map'>
        {this.state.objectivesList && this.state.objectivesList.map((objectives, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {objectives.map((objective, key) => (
              <OkrCard
                key={key}
                objective={objective}
                isSelected={objective.get('id') === selectedId}
                ref={`objective_${objective.get('id')}`}
              />
            ))}
          </Card.Group>
        ))}
        {this.state.okrPathPropsList && this.state.okrPathPropsList.map((okrPathProps, key) => (
          <OkrPath key={key} {...okrPathProps} onClick={this.updateObjectivesList.bind(this, okrPathProps)} />
        ))}
      </div>
    );
  }
}

OkrMap.propTypes = {
  objective: PropTypes.object.isRequired,
  objectives: PropTypes.object.isRequired,
};

export default OkrMap;
