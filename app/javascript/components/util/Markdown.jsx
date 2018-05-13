import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'
import emoji from 'remark-emoji'

class Markdown extends Component {

  render() {

    const options = {
      gfm: true,
      pedantic: true,
      breaks: true,
    }
    return (
      <div className='markdown'>
        {remark()
          .use(emoji)
          .use(reactRemark)
          .processSync(this.props.text, options)
          .contents}
      </div>
    )
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Markdown
