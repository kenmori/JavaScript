import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Icon, Popup } from "semantic-ui-react";

class RequiredLabel extends PureComponent {
  render() {
    return (
      <label className="required-label">
        <span>{this.props.text}</span>
        {this.props.required && (
          <Popup
            inverted
            size="tiny"
            position="right center"
            content="必須"
            trigger={(
<Icon
                name="asterisk"
                color="red"
                size="small"
                className="required-label__icon"
              />
)}
          />
        )}
      </label>
    );
  }
}

RequiredLabel.propTypes = {
  // container
  // component
  text: PropTypes.string.isRequired,
  required: PropTypes.bool,
};

RequiredLabel.defaultProps = {
  required: true,
};

export default RequiredLabel;
