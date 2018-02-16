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
    this.onResize = () => this.updateOkrPathProps(this.state);
  }

  componentWillMount() {
    this.createObjectivesList(this.props.objective);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective.get('id') !== nextProps.objective.get('id')
      || this.props.objective.get('parentObjectiveId') !== nextProps.objective.get('parentObjectiveId')) {
      this.createObjectivesList(nextProps.objective);
    } else if (this.props.objective !== nextProps.objective) {
      this.createObjectivesList(nextProps.objective, this.state.visibleIds);
    }
  }

  createObjectivesList(objective, visibleIds = List.of(objective.get('id'))) {
    const findRoot = (objective, rootId) => {
      if (objective.get('id') === rootId) {
        return objective;
      } else {
        const parent = objective.get('parentObjective');
        if (parent) {
          return findRoot(parent, rootId);
        } else {
          // 他人の親 Objective の場合
          this.props.fetchObjective(objective.get('parentObjectiveId'));
        }
        return objective;
      }
    };

    const collectDescendants = (result, objective) => {
      const childObjectiveIds = objective.get('childObjectiveIds');
      if (!childObjectiveIds.isEmpty()) {
        const childObjectives = objective.get('childObjectives');
        if (childObjectiveIds.size === childObjectives.size) {
          result = result.push(childObjectives);
          const child = childObjectives.find(objective => visibleIds.includes(objective.get('id')));
          if (child) {
            result = collectDescendants(result, child);
          }
        } else {
          // 他人の子 Objective が含まれている場合
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
        const childObjectiveIds = objective.get('childObjectiveIds');
        if (!childObjectiveIds.isEmpty()) {
          result = result.push({
            fromId: objective.get('id'),
            toIds: childObjectiveIds
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
    this.createObjectivesList(this.state.rootObjective, visibleIds);
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
};

export default OkrMap;