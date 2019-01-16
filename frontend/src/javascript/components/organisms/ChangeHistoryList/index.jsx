import React from 'react';
import ChangeHistory from "../../molecules/ChangeHistory";

const formatChangeLog = (changelog) => {
  let message = "";
  for(let k of Object.keys(changelog)) {
    const src = changelog[k][0] != null ? changelog[k][0] : "初期値";
    const dst = changelog[k][1] != null ? changelog[k][1] : "初期値";
    message += `${k}を ${src} -> ${dst} へ変更`;
  }

  return message;
}

const ChangeHistoryList = React.memo(({ histories }) => (
  histories.map(e => {
    const user = e.get("user");

    return (
      <ChangeHistory
        avatar={user.get("avatar").get("url")}
        firstName={user.get("firstName")}
        lastName={user.get("lastName")}
        changedAt={e.get("createdAt")}
        changeLog={formatChangeLog(e.get("objectChanges"))} />
    )
  })
));
ChangeHistoryList.defaultProps = {
  histories: [],
};

export default ChangeHistoryList;
