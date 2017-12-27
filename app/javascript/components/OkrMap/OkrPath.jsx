import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class OkrPath extends Component {
  static LENGTH = 24;

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
      if (this.props.isExpanded) {
        const centerY = (from.y + to.y) / 2;
        return `${from.x},${from.y} ${from.x},${centerY} ${to.x},${centerY} ${to.x},${to.y}`;
      } else {
        if (this.props.toAncestor) {
          return `${to.x},${to.y - OkrPath.LENGTH} ${to.x},${to.y}`;
        } else {
          return `${from.x},${from.y} ${from.x},${from.y + OkrPath.LENGTH}`;
        }
      }
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
    let x;
    let y;
    if (this.props.isExpanded) {
      x = from.x;
      y = (from.y + to.y) / 2;
    } else {
      if (this.props.toAncestor) {
        x = to.x;
        y = to.y - OkrPath.LENGTH;
      } else {
        x = from.x;
        y = from.y + OkrPath.LENGTH;
      }
    }
    return {
      position: 'absolute',
      top: y - this.state.iconTopDiff,
      left: x - this.state.iconLeftDiff,
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
  targetId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default OkrPath;
