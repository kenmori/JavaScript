import React from "react";
import Markdown from "../Markdown";

function formatChangeLog(type, diffs) {
  let message = "";

  for (const e of diffs) {
    if (type === "key_result_version" || type === "objective_version") {
      message += `**${e.get("column")}**を \`${e.get(
        "before",
      )}\` から \`${e.get("after")}\` へ変更\n`;
    } else {
      message += `**${e.get("column")}**が投稿されました\n${e.get("after")}`;
    }
  }

  return message;
}

const ChangeHistory = React.memo(({ type, diffs }) => (
  <Markdown text={formatChangeLog(type, diffs)} />
));

export default ChangeHistory;
