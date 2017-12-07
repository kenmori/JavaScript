import React, { Component } from 'react';
import ReactDOM from 'react-dom';
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

  updatechildObjectivePositions(objective) {
    if(!this.props.objective.get('childObjectives')) return null;
    const childObjectivePositions = objective.get('childObjectives').reduce((result, objective) => {
      const element = ReactDOM.findDOMNode(this.refs[this.createKey(objective)]);
      result[this.createKey(objective)] = { x: element.offsetLeft + (element.offsetWidth / 2), y: element.offsetTop };
      return result;
    }, {});

    this.setState({
      childObjectivePositions,
      width: ReactDOM.findDOMNode(this.refs.map).offsetWidth,
      height: ReactDOM.findDOMNode(this.refs.map).offsetHeight + 30,
      startY: ReactDOM.findDOMNode(this.refs['objective_root']).offsetTop + ReactDOM.findDOMNode(this.refs['objective_root']).offsetHeight,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if(prevProps !== this.props) {
      this.updatechildObjectivePositions(this.props.objective);
    }
  }

  componentDidMount() {
    this.updatechildObjectivePositions(this.props.objective);
    window.addEventListener('resize', () => this.updateChildObjectivePositions(this.props.objective));
  }

  path() {
    const center = this.state.width / 2;
    if(!this.state.childObjectivePositions) return null;
    if(!this.props.objective.get('childObjectives')) return null;
    return this.props.objective.get('childObjectives').map((objective) => {
      const position = this.state.childObjectivePositions[this.createKey(objective)];
      if(!position) {return null; }
      const points = `${center},${this.state.startY} ${center},${position.y - 15} ${position.x},${position.y - 15} ${position.x},${position.y}`;
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
      <div key={objective.get('id')} className='okr-map' ref='map'>
        <div className='map-layer'>
          <Card.Group className='flex-center'>
            <ObjectiveCard objective={objective} ref='objective_root'/>
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
        {
          this.path()
          // パスの描画
        }
      </div>
    );
  }
}

OkrMap.propTypes = {};

export default OkrMap;
