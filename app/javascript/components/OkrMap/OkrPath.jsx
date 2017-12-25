import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class OkrPath extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconTopDiff: 0,
      iconLeftDiff: 0,
    };
  }

  componentDidMount() {
    const icon = findDOMNode(this.refs.icon);
    this.setState({
      iconTopDiff: icon.offsetHeight / 2,
      iconLeftDiff: icon.offsetWidth / 2,
    });
  }

  getPointsList() {
    const from = this.props.fromPoint;
    return this.props.toPoints.map(to => {
      const centerY = (from.y + to.y) / 2;
      const first = `${from.x},${from.y} ${from.x},${centerY}`;
      const second = `${to.x},${centerY} ${to.x},${to.y}`;
      return this.props.isExpanded ? `${first} ${second}` : (this.props.direction === 'ancestor' ? second : first);
    });
  }

  getSvgStyle() {
    return {
      position: 'absolute',
      top: this.props.top,
      left: 0,
    };
  }

  getIconStyle() {
    const from = this.props.fromPoint;
    const to = this.props.toPoints.first();
    const top = this.props.top;
    return {
      position: 'absolute',
      top: top + (from.y + to.y) / 2 - this.state.iconTopDiff,
      left: from.x - this.state.iconLeftDiff,
    };
  }

  render() {
    return (
      <div className='okr-path'>
        <svg width={this.props.width} height={this.props.height} style={this.getSvgStyle()}>
          {this.getPointsList().map((points, key) => (
            <polyline
              key={key}
              points={points}
              strokeWidth='2'
              stroke='silver'
              fill='none'
            />
          ))}
        </svg>
        <Icon link name={`${this.props.isExpanded ? 'minus' : 'plus'} square outline`} size='large' ref='icon'
              style={this.getIconStyle()} onClick={() => this.props.onClick()} />
      </div>
    );
  }
}

OkrPath.propTypes = {
  top: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fromPoint: PropTypes.object.isRequired,
  toPoints: PropTypes.object.isRequired,
  objectiveIds: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  direction: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OkrPath;
