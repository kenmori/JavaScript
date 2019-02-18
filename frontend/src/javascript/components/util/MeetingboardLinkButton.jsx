import React, { useEffect, useState, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

const MeetingboardLinkButton = memo(
  ({ objective }) => {
    const [isVisiable, setIsVisiable] = useState(false);
    const handleMeetingBoardLinkClick = useCallback(() => {
      window.open(
        `/meetings/${objective.get("id")}`,
        "_blank",
        `height=${window.parent.screen.height},
      width=${window.parent.screen.width}`,
      );
    }, []);
    useEffect(() => {
      location.pathname.includes("/meetings/") && setIsVisiable(true);
    }, [location.pathname]);
    return (
      <>
        {isVisiable ? null : (
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
  },
  (p, n) => {
    return p.objective.get("id") === n.objective.get("id");
  },
);

MeetingboardLinkButton.propTypes = {
  objective: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default MeetingboardLinkButton;
