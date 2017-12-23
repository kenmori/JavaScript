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
      fromToPointsList: null,
      width: 0,
      height: 0,
      groups: this.createOkrGroups(props.objective, props.objectives),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective !== nextProps.objective) {
      this.setState({
        groups: this.createOkrGroups(nextProps.objective, nextProps.objectives),
      });
    }
  }

  createOkrGroups(objective, objectives) {
    // TODO: 将来的には親と子だけでなく祖先や子孫も展開して描画できるようにする
    const groups = [];

    function collectAncestors(objective) {
      const parentId = objective.get('parentObjectiveId');
      if (parentId) {
        const parent = objectives.find(objective => objective.get('id') === parentId)
        groups.unshift(List.of(parent));
        collectAncestors(parent);
      }
    }

    function collectDescendants(objective) {
      const childObjectives = objective.get('childObjectives');
      if (!childObjectives.isEmpty()) {
        groups.push(childObjectives);
        childObjectives.map(child => collectDescendants(child));
      }
    }

    collectAncestors(objective);
    groups.push(List.of(objective));
    collectDescendants(objective);
    return List.of(...groups);
  }

  updateFromToPoints() {
    const edgesList = this.state.groups.map(group => (
      group.map(objective => {
        const element = findDOMNode(this.refs[this.getKey(objective)]);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        return {
          top: { x: x, y: element.offsetTop },
          bottom: { x: x, y: element.offsetTop + element.offsetHeight },
        };
      })
    ));

    // {top, bottom}, {top, bottom}... を1つずつずらした {bottom, top} から {from, to} の組み合わせを作る
    const fromToPointsList = edgesList.map((edges, key, iter) => {
      if (key === 0) return;
      const prev = iter.get(key - 1).first();
      return {
        fromPoint: prev.bottom,
        toPoints: edges.map(next => next.top),
      };
    }).skip(1);

    const map = findDOMNode(this.refs.map);
    this.setState({
      fromToPointsList: fromToPointsList,
      width: map.offsetWidth,
      height: map.offsetHeight,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if (prevProps !== this.props) {
      this.updateFromToPoints(this.props.objective);
    }
  }

  componentDidMount() {
    this.updateFromToPoints(this.props.objective);
    window.addEventListener('resize', () => this.updateFromToPoints(this.props.objective));
  }

  getKey = objective => {
    return `objective_${objective.get('id')}`;
  }

  render() {
    const selectedId = this.props.objective.get('id');
    return (
      <div className='okr-map' ref='map'>
        {this.state.groups.map((group, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {group.map((objective, key) => (
              <OkrCard
                key={key}
                objective={objective}
                isSelected={objective.get('id') === selectedId}
                ref={this.getKey(objective)}
              />
            ))}
          </Card.Group>
        ))}
        {this.state.fromToPointsList && this.state.fromToPointsList.map((fromToPoints, key) => (
          <OkrPath key={key} width={this.state.width} height={this.state.height}
                   fromPoint={fromToPoints.fromPoint} toPoints={fromToPoints.toPoints} />
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
