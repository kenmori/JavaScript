import React, { useCallback, memo } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

const MeetingboardLinkButton = memo(
  ({ objectiveId, disabled }) => {
    const handleMeetingBoardLinkClick = useCallback(() => {
      window.open(
        `/meetings/${objectiveId}`,
        "_blank",
        `height=${window.parent.screen.height},
      width=${window.parent.screen.width}`,
      );
    }, [objectiveId]);

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
            disabled={disabled}
            onClick={handleMeetingBoardLinkClick}
          />
        }
      />
    );
  },
  (prevProps, nextProps) => prevProps.objectiveId === nextProps.objectiveId,
);

MeetingboardLinkButton.defaultProps = {
  disabled: false,
};

MeetingboardLinkButton.propTypes = {
  objective: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default MeetingboardLinkButton;
