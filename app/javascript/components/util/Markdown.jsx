import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import remark from 'remark';
import reactRemark from 'remark-react'
import emoji from 'remark-emoji'

class Markdown extends PureComponent {

  render() {
    const options = {
      gfm: true,
      pedantic: true,
      breaks: true,
      sanitize: false,
    }
    return (
      <div className="markdown markdown-body">
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
