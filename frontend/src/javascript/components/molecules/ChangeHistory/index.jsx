import React from "react";
import { Comment } from "semantic-ui-react";
import moment from "moment";
import Markdown from "../../atoms/Markdown";
import avatar_image from "../../../images/avatar.png";

const ChangeHistory = React.memo(
  ({ avatar, firstName, lastName, changedAt, type, diffs }) => (
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
            <Markdown.ChangeLog type={type} diffs={diffs} />
          </Comment.Text>
        </Comment.Content>
      </Comment>
    </Comment.Group>
  ),
);

export default ChangeHistory;
