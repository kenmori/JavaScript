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
      return this.props.isExpanded ? `${first} ${second}` : (this.props.toAncestor ? second : first);
    });
  }

  getSvgStyle() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    };
  }

  getIconStyle() {
    const from = this.props.fromPoint;
    const to = this.props.toPoints.first();
    return {
      position: 'absolute',
      top: (from.y + to.y) / 2 - this.state.iconTopDiff,
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
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fromPoint: PropTypes.object.isRequired,
  toPoints: PropTypes.object.isRequired,
  toAncestor: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  targetIds: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OkrPath;
