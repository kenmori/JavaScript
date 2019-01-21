import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";
import Markdown from "../../util/Markdown";
import avatar_image from "../../../images/avatar.png";

const formatChangeLog = diffs => {
  let message = "";

  for (const e of diffs) {
    message += `**${e.get("column")}**を \`${e.get("before")}\` から \`${e.get(
      "after",
    )}\` へ変更\n`;
  }

  return message;
};

const ChangeHistory = React.memo(
  ({ avatar, firstName, lastName, changedAt, diffs }) => (
    <Comment.Group className="change-history">
      <Comment>
        <Comment.Avatar src={avatar || avatar_image} />
        <Comment.Content>
          <Comment.Author>
            <span className="user-name">
              <span className="user-name__text">
                {`${lastName} ${firstName}`}
              </span>
            </span>
          </Comment.Author>
          <Comment.Metadata>
            {moment(changedAt).format("YYYY/M/D H:mm")}
          </Comment.Metadata>
          <Comment.Text>
            <Markdown text={formatChangeLog(diffs)} />
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  ),
);

export default ChangeHistory;
