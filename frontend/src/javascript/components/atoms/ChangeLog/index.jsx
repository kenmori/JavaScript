import React from "react";
import Markdown from "../Markdown";

function formatChangeLog(diffs) {
  let message = "";

  for (const e of diffs) {
    message += `**${e.get("column")}**を \`${e.get("before")}\` から \`${e.get(
      "after",
    )}\` へ変更\n`;
  }

  return message;
}

const ChangeHistory = React.memo(({ diffs }) => (
  <Markdown text={formatChangeLog(diffs)} />
));

export default ChangeHistory;
