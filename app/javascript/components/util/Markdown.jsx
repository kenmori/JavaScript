import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'

class Markdown extends Component {

  render() {
    return remark().use(reactRemark).processSync(this.props.text).contents
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Markdown
