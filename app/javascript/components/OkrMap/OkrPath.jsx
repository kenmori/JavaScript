import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class OkrPath extends Component {
  getPointsList(from, tos) {
    return tos.map(to => {
      const centerY = (from.y + to.y) / 2;
      return `${from.x},${from.y} ${from.x},${centerY} ${to.x},${centerY} ${to.x},${to.y}`;
    });
  }

  getIconStyle(from, to) {
    return {
      position: 'absolute',
      top: (from.y + to.y) / 2 - 10,
      left: from.x - 12,
    }
  }

  render() {
    const pointsList = this.getPointsList(this.props.fromPoint, this.props.toPoints);
    const iconStyle = this.getIconStyle(this.props.fromPoint, this.props.toPoints.first());
    return (
      <div className='okr-path'>
        <svg width={this.props.width} height={this.props.height} style={{ position: 'absolute', top: 0, left: 0 }}>
          {pointsList.map((points, key) => (
            <polyline
              key={key}
              points={points}
              strokeWidth='2'
              stroke='silver'
              fill='none'
            />
          ))}
        </svg>
        <Icon link name='minus square outline' size='large' style={iconStyle} onClick={() => {}} />
      </div>
    );
  }
}

OkrPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fromPoint: PropTypes.object.isRequired,
  toPoints: PropTypes.object.isRequired,
};

export default OkrPath;
