import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Dimmer, Loader, Image, Segment } from 'semantic-ui-react'

class Loading extends Component {
  render() {
    if (!this.props.isOpened) { return null; }
    return (
      <div className="loading">
        <div className="loading__inner">
          <Loader active />
        </div>
      </div>
    )
  }
}

Loading.propTypes = {
  isOpened: PropTypes.bool.isRequired,
};
Loading.defaultProps = {
  isOpened: false,
};

export default Loading;
