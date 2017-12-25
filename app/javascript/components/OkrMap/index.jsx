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
    const map = findDOMNode(this.refs.map);
    const edgesList = objectivesList.reduce((result, objectives, key, iter) => {
      if (key === 0) {
        // 親がいる場合は親へのパスを追加する
        const parentId = objectives.first().get('parentObjectiveId');
        if (parentId) {
          result = result.push(List.of({
            top: { x: 0, y: 0 },
            bottom: { x: map.offsetWidth / 2, y: 0 },
            objectiveIds: List.of(parentId),
            isVisible: false,
          }));
        }
      }

      const edges = objectives.map(objective => {
        const objectiveId = objective.get('id');
        const element = findDOMNode(this.refs[`objective_${objectiveId}`]);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        return {
          top: { x: x, y: element.offsetTop },
          bottom: { x: x, y: element.offsetTop + element.offsetHeight },
          objectiveIds: List.of(objectiveId),
          isVisible: true,
        };
      });
      result = result.push(edges);

      if (key === iter.size - 1) {
        // 子がいる場合は子へのパスを追加する
        const childIds = objectives.first().get('childObjectives').map(objective => objective.get('id'));
        if (!childIds.isEmpty()) {
          result = result.push(List.of({
            top: { x: map.offsetWidth / 2, y: map.offsetHeight },
            bottom: { x: 0, y: 0 },
            objectiveIds: childIds,
            isVisible: false,
          }));
        }
      }

      return result;
    }, List());

    // {top, bottom}, {top, bottom}... を1つずつずらした {bottom, top} から {from, to} の組み合わせを作る
    const selectedId = this.props.objective.get('id');
    let toAncestor = true;
    const okrPathPropsList = edgesList.map((edges, key, iter) => {
      if (key === 0) return null;
      const parent = iter.get(key - 1).first();
      const top = parent.bottom.y;
      if (parent.objectiveIds.includes(selectedId)) {
        toAncestor = false;
      }
      return {
        top: top,
        width: map.offsetWidth,
        height: edges.first().top.y - top,
        fromPoint: { x: parent.bottom.x, y: 0 },
        toPoints: edges.map(current => ({ x: current.top.x, y: current.top.y - top })),
        objectiveIds: toAncestor ? parent.objectiveIds : edges.flatMap(edge => edge.objectiveIds),
        isExpanded: parent.isVisible && edges.first().isVisible,
        direction: toAncestor ? 'ancestor' : 'descendant',
      };
    }).skip(1);

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

  updateObjectivesList({ objectiveIds, isExpanded, direction }) {
    let objectivesList;
    if (isExpanded) {
      const index = this.state.objectivesList.findIndex(objectives =>
        objectives.map(objective => objective.get('id')).equals(objectiveIds)
      );
      objectivesList = direction === 'ancestor'
        ? this.state.objectivesList.skip(index + 1) : this.state.objectivesList.take(index);
    } else {
      // FIXME: this.props.objectives には自分の Objective しかないため他人が責任者の Objective を取得できない
      const objectives = objectiveIds.map(id => this.props.objectives.find(objective => objective.get('id') === id));
      objectivesList = direction === 'ancestor'
        ? this.state.objectivesList.insert(0, objectives) : this.state.objectivesList.push(objectives);
    }
    this.setState({
      objectivesList: objectivesList,
    });
  }

  render() {
    const selectedId = this.props.objective.get('id');
    return (
      <div className='okr-map' ref='map'>
        {this.state.objectivesList.map((objectives, key) => {
          return (
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
          );
        })}
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
