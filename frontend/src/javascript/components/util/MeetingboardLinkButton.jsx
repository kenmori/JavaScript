import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

// TODO
const MeetingboardLinkButton = ({ objective }) => {
  const [isDisplayed, setDisplayed] = useState(false);
  const handleMeetingBoardLinkClick = useCallback(() => {
    window.open(
      `/meetings/${objective.get("id")}`,
      "_blank",
      `height=${window.parent.screen.height},
      width=${window.parent.screen.width}`,
    );
  }, []);
  useEffect(() => {
    location.pathname.includes("/meetings/") && setDisplayed(true);
  }, [location.pathname]);
  return (
    <>
      {isDisplayed ? null : (
        <div onClick={handleMeetingBoardLinkClick}>
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
              />
            }
          />
        </div>
      )}
    </>
  );
};

MeetingboardLinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default MeetingboardLinkButton;
