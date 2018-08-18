import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'
import emoji from 'remark-emoji'
import style from 'github-markdown-css/github-markdown.css'

class Markdown extends PureComponent {

  render() {

    const options = {
      gfm: true,
      pedantic: true,
      breaks: true,
      sanitize: false,
    }

    return (
      <div className={`${'markdown-body'}`}>
        {remark()
          .use(emoji)
          .use(reactRemark, options)
          .processSync(this.props.text)
          .contents}
      </div>
    )
  }
}

Markdown.propTypes = {
  text: PropTypes.string.isRequired,
}

export default Markdown
