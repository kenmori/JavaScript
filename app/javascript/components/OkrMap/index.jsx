import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import OkrCard from '../../containers/OkrCard';
import { Card } from 'semantic-ui-react';
import { List } from 'immutable'

class OkrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pointsList: null,
      width: 0,
      height: 0,
      selectedCardId: -1,
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
        collectAncestors(parent)
      }
    }

    collectAncestors(objective)
    groups.push(List.of(objective))
    if (!objective.get('childObjectives').isEmpty()) {
      groups.push(objective.get('childObjectives'));
    }
    return List.of(...groups);
  }

  updatePointsList() {
    const edges = this.state.groups.map(group => (
      group.reduce((result, objective) => {
        const element = findDOMNode(this.refs[this.getKey(objective)]);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        return result.push({
          top: { x: x, y: element.offsetTop },
          bottom: { x: x, y: element.offsetTop + element.offsetHeight },
        });
      }, List())
    ));
    const pointsList = edges.reduce((result, _, key, iter) => {
      if (key === 0) return result;

      const prev = iter.get(key - 1).first();
      return iter.get(key).map(next => {
        const centerY = (prev.bottom.y + next.top.y) / 2;
        return `${prev.bottom.x},${prev.bottom.y} ${prev.bottom.x},${centerY} ${next.top.x},${centerY} ${next.top.x},${next.top.y}`
      });
    }, List());

    const map = findDOMNode(this.refs.map);
    this.setState({
      pointsList: pointsList,
      width: map.offsetWidth,
      height: map.offsetHeight,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if (prevProps !== this.props) {
      this.updatePointsList(this.props.objective);
    }
  }

  componentDidMount() {
    this.updatePointsList(this.props.objective);
    window.addEventListener('resize', () => this.updatePointsList(this.props.objective));
  }

  pathSvg() {
    if (!this.state.pointsList || this.state.pointsList.isEmpty()) return null;
    return (
      <svg width={this.state.width} height={this.state.height} style={{ position: 'absolute', top: 0, left: 0 }}>
        {this.state.pointsList.map((points, key) => (
          <polyline
            key={key}
            points={points}
            strokeWidth='2'
            stroke='silver'
            fill='none'
          />
        ))}
      </svg>
    );
  }

  getKey = objective => {
    return `objective_${objective.get('id')}`;
  }

  selectCard = cardId => {
    this.setState({
      selectedCardId: cardId,
    });
  }

  render() {
    return (
      <div className='okr-map' ref='map'>
        {this.state.groups.map((group, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {group.map((objective, key) => (
              <OkrCard
                key={key}
                objective={objective}
                onSelect={this.selectCard}
                isSelected={this.state.selectedCardId === objective.get('id')}
                ref={this.getKey(objective)}
              />
            ))}
          </Card.Group>
        ))}
        {this.pathSvg()}
      </div>
    );
  }
}

OkrMap.propTypes = {
  objective: PropTypes.object.isRequired,
  objectives: PropTypes.object.isRequired,
};

export default OkrMap;
