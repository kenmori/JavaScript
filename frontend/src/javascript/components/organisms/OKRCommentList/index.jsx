import React from "react";
import { Map, List } from "immutable";
import OKRComment from "../../molecules/OKRComment";

const OKRCommentList = React.memo(
  ({ comments, commentLabels, onDelete, onUpdate }) => (
    <React.Fragment>
      {comments.map(comment => (
        <OKRComment
          key={comment.get("id")}
          comment={comment}
          commentLabels={commentLabels}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </React.Fragment>
  ),
);

OKRCommentList.defaultProps = {
  comments: Map(),
  commentLabels: List(),
};

export default OKRCommentList;
