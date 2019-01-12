import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import OkrComment from "./OkrComment";

const INITIAL_VIEW_COMMENT = 3;
const VIEW_MORE_COMMENT = 5;

class StretchCommentPane extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayCommentCount: INITIAL_VIEW_COMMENT,
    };
  }

  handleDisplayComment = value => {
    this.setState({
      displayCommentCount: this.state.displayCommentCount + value,
    });
  };

  render() {
    const { comments, commentLabels, onDelete, onUpdate } = this.props;
    const viewComments = comments.filter(
      (_, index) => index < this.state.displayCommentCount,
    );

    return (
      <div>
        {viewComments
          ? viewComments.map(comment => (
            <OkrComment
                key={comment.get("id")}
                comment={comment}
                commentLabels={commentLabels}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            ))
          : null}
        {comments.size > this.state.displayCommentCount ? (
          <a
            className="comment-pane__viewmore"
            onClick={() => this.handleDisplayComment(VIEW_MORE_COMMENT)}>
            さらに表示
          </a>
        ) : null}
      </div>
    );
  }
}

StretchCommentPane.propTypes = {
  // container
  // component
  comments: ImmutablePropTypes.list.isRequired,
  commentLabels: ImmutablePropTypes.list,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default StretchCommentPane;
