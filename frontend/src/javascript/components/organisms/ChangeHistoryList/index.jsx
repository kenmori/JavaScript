import React from "react";
import ChangeHistory from "../../molecules/ChangeHistory";

const ChangeHistoryList = React.memo(({ histories }) =>
  histories.map(e => {
    const user = e.get("user");

    return (
      <ChangeHistory
        avatar={user.get("avatarUrl")}
        firstName={user.get("firstName")}
        lastName={user.get("lastName")}
        changedAt={e.get("createdAt")}
        diffs={e.get("diffs")}
      />
    );
  }),
);
ChangeHistoryList.defaultProps = {
  histories: [],
};

export default ChangeHistoryList;
