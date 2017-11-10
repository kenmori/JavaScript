import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Image } from 'semantic-ui-react';

class Avatar extends Component {
  image = (path) => (
    path || 'https://s3-ap-northeast-1.amazonaws.com/resily-development/avatar/default.png'
  )
  render() {
    return (
      <Image src={this.image(this.props.path)} avatar/>
    );
  }
}

Avatar.propTypes = {
  path: PropTypes.string
};

export default Avatar;
