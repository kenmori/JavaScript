import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import remark from "remark";
import remark2react from "remark-react";
import emoji from "remark-emoji";
import breaks from "remark-breaks";
import externalLinks from "remark-external-links";
import ChangeLog from "./ChangeLog";

class Markdown extends PureComponent {
  static ChangeLog = ChangeLog;

  constructor() {
    super();
    this.state = { key: new Date().getTime() };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.text !== nextProps.text) {
      this.setState({ key: new Date().getTime() });
    }
  }

  render() {
    const { text } = this.props;
    const { key } = this.state;
    return (
      <div className="markdown markdown-body" key={key}>
        {
          remark()
            .use(remark2react)
            .use(emoji)
            .use(breaks)
            .use(externalLinks)
            .processSync(text).contents
        }
      </div>
    );
  }
}

Markdown.propTypes = {
  text: PropTypes.string,
};

Markdown.defaultProps = {
  text: "",
};

export default Markdown;
