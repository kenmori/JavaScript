import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';

class OkrPath extends Component {
  getPointsList(edges) {
    return edges.map(edge => {
      const centerY = (edge.bottom.y + edge.top.y) / 2;
      return `${edge.bottom.x},${edge.bottom.y} ${edge.bottom.x},${centerY} ${edge.top.x},${centerY} ${edge.top.x},${edge.top.y}`;
    });
  }

  render() {
    const pointsList = this.getPointsList(this.props.edges);
    return (
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
    );
  }
}

OkrPath.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  edges: PropTypes.object.isRequired,
};

export default OkrPath;
