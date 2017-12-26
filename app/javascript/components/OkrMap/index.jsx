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
      okrPathPropsList: null,
      objectivesList: this.createObjectivesList(props.objective),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective !== nextProps.objective) {
      this.setState({
        objectivesList: this.createObjectivesList(nextProps.objective),
      });
    }
  }

  createObjectivesList(objective) {
    const objectivesList = List.of(List.of(objective));
    const childObjectives = objective.get('childObjectives');
    return childObjectives.isEmpty() ? objectivesList : objectivesList.push(childObjectives);
  }

  updateOkrPathProps(objectivesList) {
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
    const mapElement = findDOMNode(this.refs.map);
    const selectedId = this.props.objective.get('id');
    let toAncestor = true;
    const okrPathPropsList = links.map((link, key) => {
      let isExpanded = true;
      if (link.fromId === selectedId) {
        toAncestor = false;
      }

      let fromPoint;
      const fromRef = this.refs[`objective_${link.fromId}`];
      if (fromRef) {
        const element = findDOMNode(fromRef);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        fromPoint = { x: x, y: element.offsetTop + element.offsetHeight };
      } else {
        isExpanded = false;
        fromPoint = { x: mapElement.offsetWidth / 2, y: 0 };
      }

      const toPoints = link.toIds.map(toId => {
        const toRef = this.refs[`objective_${toId}`];
        if (toRef) {
          const element = findDOMNode(toRef);
          const x = element.offsetLeft + (element.offsetWidth / 2);
          return { x: x, y: element.offsetTop };
        } else {
          isExpanded = false;
          return { x: mapElement.offsetWidth / 2, y: mapElement.offsetHeight };
        }
      })

      return {
        width: mapElement.offsetWidth,
        height: mapElement.offsetHeight,
        fromPoint: fromPoint,
        toPoints: toPoints,
        toAncestor: toAncestor,
        isExpanded: isExpanded,
        targetIds: toAncestor ? List.of(link.fromId) : link.toIds,
      };
    });

    this.setState({
      okrPathPropsList: okrPathPropsList,
    });
  }

  componentDidMount() {
    this.updateOkrPathProps(this.state.objectivesList);
    window.addEventListener('resize', () => this.updateOkrPathProps(this.state.objectivesList));
  }

  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if (prevProps !== this.props || prevState.objectivesList !== this.state.objectivesList) {
      this.updateOkrPathProps(this.state.objectivesList);
    }
  }

  updateObjectivesList({ toAncestor, isExpanded, targetIds }) {
    let objectivesList;
    if (isExpanded) {
      const index = this.state.objectivesList.findIndex(objectives =>
        objectives.map(objective => objective.get('id')).equals(targetIds)
      );
      objectivesList = toAncestor ? this.state.objectivesList.skip(index + 1) : this.state.objectivesList.take(index);
    } else {
      // FIXME: this.props.objectives には自分の Objective しかないため他人が責任者の Objective を取得できない
      const objectives = targetIds.map(id => this.props.objectives.find(objective => objective.get('id') === id));
      objectivesList = toAncestor ? this.state.objectivesList.insert(0, objectives) : this.state.objectivesList.push(objectives);
    }
    this.setState({
      objectivesList: objectivesList,
    });
  }

  render() {
    const selectedId = this.props.objective.get('id');
    return (
      <div className='okr-map' ref='map'>
        {this.state.objectivesList.map((objectives, key) => (
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
