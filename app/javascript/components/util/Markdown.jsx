import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'
import OKRComment from "../okrmodal/OKRComment";

class Markdonw extends Component {

  render() {
    return remark().use(reactRemark).processSync(this.props.text).contents
  }
}

Markdonw.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Markdonw
