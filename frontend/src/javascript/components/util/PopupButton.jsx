import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form, Button, Popup } from "semantic-ui-react";

class PopupButton extends PureComponent {
  render() {
    const { icon, text, tips, negative, inForm, onClick } = this.props;
    return (
      <Popup
        hoverable
        size="tiny"
        content={tips}
        trigger={
          inForm ? (
            <Form.Button
              icon={icon}
              content={text}
              onClick={onClick}
              negative={negative}
            />
          ) : (
            <Button
              icon={icon}
              content={text}
              onClick={onClick}
              negative={negative}
            />
          )
        }
      />
    );
  }
}

PopupButton.propTypes = {
  // container
  // component
  icon: PropTypes.string,
  text: PropTypes.string,
  tips: PropTypes.string.isRequired,
  negative: PropTypes.bool,
  inForm: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

PopupButton.defaultProps = {
  icon: null,
  text: null,
  negative: false,
  inForm: false,
};

export default PopupButton;
