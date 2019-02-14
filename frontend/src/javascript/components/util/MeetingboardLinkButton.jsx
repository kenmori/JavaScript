import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

class MeetingboardLinkButton extends PureComponent {
  render() {
    const { disabled, onClick } = this.props;
    return (
      <Popup
        hoverable
        size="tiny"
        position="right center"
        content="ミーティングボードを表示する"
        trigger={
          <Button
            disabled={disabled}
            className="meeting-link-button"
            circular
            basic
            compact
            icon="clipboard"
            size="small"
            active
            onClick={onClick}
          />
        }
      />
    );
  }
}

MeetingboardLinkButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MeetingboardLinkButton;
