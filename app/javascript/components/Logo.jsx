import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <img src={this.props.path || '/packs/images/logo-01f2a16d666b66ec1e2c17764ffe394d.png'} className="logo__img" />
      </div>
    )
  }
}

Logo.propTypes = {
  path: PropTypes.string,
  size: PropTypes.string,
};
Logo.defaultProps = {
  path: null,
  size: 'normal',
};

export default Logo;
