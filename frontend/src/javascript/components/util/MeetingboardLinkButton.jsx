import React from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

//TODO 以下useStateで管理する
const handleMeetingBoardLinkClick = objectiveId => {
  window.open(
    `/meetings/${objectiveId}`,
    "_blank",
    `height=${window.parent.screen.height},
    width=${window.parent.screen.width}`,
  );
};

const isMeetingWindow = () => location.pathname.includes("/meetings/");

const MeetingboardLinkButton = ({ objective }) => {
  return (
    <>
      {isMeetingWindow() ? null : (
        <div onClick={() => handleMeetingBoardLinkClick(objective.get("id"))}>
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
