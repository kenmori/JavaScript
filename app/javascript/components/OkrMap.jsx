import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import ObjectiveCard from '../containers/ObjectiveCard';
import { Card } from 'semantic-ui-react';

class OkrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      childObjectivePositions: null,
      width: 0,
      height: 0,
    };
  }

  updateChildObjectivePositions(objective) {
    if (!this.props.objective.get('childObjectives')) return null;
    const childObjectivePositions = objective.get('childObjectives').reduce((result, objective) => {
      const element = findDOMNode(this.refs[this.createKey(objective)]);
      result[this.createKey(objective)] = { x: element.offsetLeft + (element.offsetWidth / 2), y: element.offsetTop };
      return result;
    }, {});

    this.setState({
      childObjectivePositions,
      width: findDOMNode(this.refs.map).offsetWidth,
      height: findDOMNode(this.refs.map).offsetHeight + 30,
      startY: findDOMNode(this.refs['objective_root']).offsetTop + findDOMNode(this.refs['objective_root']).offsetHeight,
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
          const position = this.state.childObjectivePositions[this.createKey(objective)];
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

  createKey(objective) {
    return `objective_${objective.get('id')}`;
  }

  render() {
    const objective = this.props.objective;
    return (
      <div key={objective.get('id')} className='okr-map' ref='map'>
        <Card.Group className='okr-map__group'>
          <ObjectiveCard objective={objective} ref='objective_root' />
        </Card.Group>
        {(() => {
          if (!objective.get('childObjectives').isEmpty()) {
            return (
              <Card.Group className='okr-map__group'>
                {objective.get('childObjectives').map((objective) => (
                  <ObjectiveCard
                    key={this.createKey(objective)}
                    objective={objective}
                    ref={this.createKey(objective)}
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

OkrMap.propTypes = {};

export default OkrMap;
