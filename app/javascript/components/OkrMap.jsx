import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ObjectiveCard from '../containers/ObjectiveCard';
import { Card } from 'semantic-ui-react';

class OkrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childObjectivePositions: null,
      width: 0,
      height: 0,
      selectedCardId: -1,
    };
  }

  updateChildObjectivePositions(objective) {
    if (!this.props.objective.get('childObjectives')) return null;
    const childObjectivePositions = objective.get('childObjectives').reduce((result, objective) => {
      const child = findDOMNode(this.refs[this.getKey(objective)]);
      result[this.getKey(objective)] = { x: child.offsetLeft + (child.offsetWidth / 2), y: child.offsetTop };
      return result;
    }, {});

    const map = findDOMNode(this.refs.map);
    const parent = findDOMNode(this.refs[this.getKey(objective)]);
    this.setState({
      childObjectivePositions,
      width: map.offsetWidth,
      height: map.offsetHeight + 30,
      startY: parent.offsetTop + parent.offsetHeight,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if (prevProps !== this.props) {
      this.updateChildObjectivePositions(this.props.objective);
    }
  }

  componentDidMount() {
    this.updateChildObjectivePositions(this.props.objective);
    window.addEventListener('resize', () => this.updateChildObjectivePositions(this.props.objective));
  }

  pathSvg() {
    const center = this.state.width / 2;
    if (!this.state.childObjectivePositions) return null;
    if (!this.props.objective.get('childObjectives')) return null;
    return (
      <svg width={this.state.width} height={this.state.height} style={{ position: 'absolute', top: 0, left: 0 }}>
        {this.props.objective.get('childObjectives').map(objective => {
          const position = this.state.childObjectivePositions[this.getKey(objective)];
          if (!position) return null;
          return (
            <polyline
              key={`polyline-${objective.get('id')}`}
              points={`${center},${this.state.startY} ${center},${position.y - 15} ${position.x},${position.y - 15} ${position.x},${position.y}`}
              strokeWidth='2'
              stroke='rgb(230, 230, 230)'
              fill='none'
            />
          );
        })}
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
    const objective = this.props.objective;
    return (
      <div className='okr-map' ref='map'>
        <Card.Group className='okr-map__group'>
          <ObjectiveCard
            objective={objective}
            onSelect={this.selectCard}
            isSelected={this.state.selectedCardId === objective.get('id')}
            ref={this.getKey(objective)}
          />
        </Card.Group>
        {(() => {
          if (!objective.get('childObjectives').isEmpty()) {
            return (
              <Card.Group className='okr-map__group'>
                {objective.get('childObjectives').map((objective) => (
                  <ObjectiveCard
                    key={this.getKey(objective)}
                    objective={objective}
                    onSelect={this.selectCard}
                    isSelected={this.state.selectedCardId === objective.get('id')}
                    ref={this.getKey(objective)}
                  />
                ))}
              </Card.Group>
            );
          }
        })()}
        {this.pathSvg()}
      </div>
    );
  }
}

OkrMap.propTypes = {
  objective: PropTypes.object.isRequired,
};

export default OkrMap;
