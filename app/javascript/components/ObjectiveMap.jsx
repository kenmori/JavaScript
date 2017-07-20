import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ObjectiveCard from '../containers/ObjectiveCard';
import { Card } from 'semantic-ui-react';

class ObjectiveMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      positions: null,
      width: 0,
      height: 0,
    };
  }

  updatePosition(objective) {
    const positions = objective.get('childObjectives').reduce((result, objective) => {
      const element = ReactDOM.findDOMNode(this.refs[this.createKey(objective)]);
      result[this.createKey(objective)] = { x: element.offsetLeft + (element.offsetWidth / 2), y: element.offsetTop };
      return result;
    }, {});

    this.setState({
      positions,
      width: ReactDOM.findDOMNode(this.refs.map).offsetWidth,
      height: ReactDOM.findDOMNode(this.refs.map).offsetHeight + 30,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    if(prevProps !== this.props) {
      this.updatePosition(prevProps.objective);
    }
  }

  componentDidMount() {
    this.updatePosition(this.props.objective);
  }

  path() {
    const center = this.state.width / 2;
    if(!this.state.positions) { return null; }
    if(!this.props.objective.get('childObjectives')) { return null; }
    return this.props.objective.get('childObjectives').map((objective) => {
      const position = this.state.positions[this.createKey(objective)];
      if(!position) {return null; }
      const points = `${center},${position.y - 30} ${center},${position.y - 15} ${position.x},${position.y - 15} ${position.x},${position.y}`;
      return (
        <svg key={`svg-${objective.get('id')}`} width={this.state.width} height={this.state.height} style={{ position: 'absolute', top: 0, left: 0 }}>
          <polyline
            points={points}
            strokeWidth='2'
            stroke='rgb(230, 230, 230)'
            fill='none'
          />
        </svg>

      );
    });
  }

  createKey(objective) {
    return `objective_${objective.get('id')}`;
  }

  render() {
    const objective = this.props.objective;
    return (
      <div key={objective.get('id')} className='objective-map' ref='map'>
        <div className='map-layer'>
          <Card.Group className='flex-center'>
            <ObjectiveCard objective={objective}/>
          </Card.Group>
        </div>
        {(() => {
          if(objective.get('childObjectives').size != 0) {
            return (
              <div className='map-layer'>
                <Card.Group className='flex-center'>
                  {
                    objective.get('childObjectives').map((objective) => {
                      return (<ObjectiveCard key={this.createKey(objective)} objective={objective} ref={this.createKey(objective)}/>);
                    })
                  }
                </Card.Group>
              </div>
            );
          }
        })()}
        {this.path()}
      </div>
    );
  }
}

ObjectiveMap.propTypes = {};

export default ObjectiveMap;
