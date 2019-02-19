import React, { useCallback, memo } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

const MeetingboardLinkButton = memo(
  ({ objective, isDisplay }) => {
    const handleMeetingBoardLinkClick = useCallback(() => {
      window.open(
        `/meetings/${objective.get("id")}`,
        "_blank",
        `height=${window.parent.screen.height},
      width=${window.parent.screen.width}`,
      );
    }, []);
    return (
      <>
        {isDisplay ? (
          <div onClick={handleMeetingBoardLinkClick}>
            <Popup
              hoverable
              size="tiny"
              position="right center"
              content="ミーティングボードを表示する"
              trigger={(
<Button
                  className="meeting-link-button"
                  circular
                  basic
                  compact
                  icon="clipboard"
                  size="small"
                  active
                />
)}
            />
          </div>
        ) : null}
      </>
    );
  },
  (p, n) => p.objective.get("id") === n.objective.get("id"),
);

MeetingboardLinkButton.defaultProps = {
  isDisplay: true,
};

MeetingboardLinkButton.propTypes = {
  objective: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default MeetingboardLinkButton;
