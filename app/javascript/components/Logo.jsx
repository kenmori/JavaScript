import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Image} from 'semantic-ui-react';
import logo_image from '../images/logo.png'

class Logo extends Component {
  render() {
    return (
      <div className="logo">
        <Image src={this.props.path || logo_image} className="logo__img" size={this.props.size} />
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
