import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

class MeetingboardLinkButton extends PureComponent {
  render() {
    const { onClick } = this.props;
    return (
      <Popup
        hoverable
        size="tiny"
        position="right center"
        content="ミーティングボードを表示する"
        trigger={
          <Button
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
  onClick: PropTypes.func.isRequired,
};

export default MeetingboardLinkButton;
