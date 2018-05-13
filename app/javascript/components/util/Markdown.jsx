import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'

class Markdown extends Component {

  render() {

    return (
      <div className='markdown'>
        {remark().use(reactRemark).processSync(this.props.text).contents}
      </div>
    )
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Markdown
