import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'
import emoji from 'remark-emoji'
import breaks from 'remark-breaks'
import externalLinks from 'remark-external-links'
import highlight from 'remark-highlight.js'

class Markdown extends PureComponent {

  render() {
    const options = {
      sanitize: false, // to use GFM task list (https://github.com/mapbox/remark-react/issues/44) 
    }
    return (
      <div className="markdown markdown-body">
        {remark()
          .use(emoji)
          .use(breaks)
          .use(externalLinks)
          .use(highlight)
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
