import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Comment, Icon } from "semantic-ui-react";
import moment from "moment";
import OkrName from "../util/OkrName";
import Markdown from "../util/Markdown";
import UserName from "../util/UserName";
import Avatar from "../util/Avatar";

const INITIAL_VIEW_COMMENT = 3;
const VIEW_MORE_COMMENT = 5;

class LabelItem extends PureComponent {
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

  handleDeleteClick = comment => {
    const { updateKeyResult, confirm } = this.props;

    confirm({
      content: "コメントをミーティングボードから非表示にしますか？",
      onConfirm: () => {
        updateKeyResult({
          id: comment.get("KeyResult").get("id"),
          comment: {
            data: {
              id: comment.get("id"),
              show_meeting_board: false,
            },
            behavior: "update_show_meeting_board",
          },
        });
      },
    });
  };

  render() {
    const { comments } = this.props;
    const viewComments = comments.filter(
      (_, index) => index < this.state.displayCommentCount,
    );

    return (
      <div className="meeting-board__comment">
        <div>
          {viewComments.map(v => {
            const user = v.get("user");
            const comment = v.get("text");
            const updatedAt = v.get("updatedAt");
            const keyResult = v.get("KeyResult");

            return (
              <Comment.Group
                key={v.get("id")}
                className="okr-comment-text-only">
                <Comment>
                  <div className="meeting-board__comment__okrname">
                    <OkrName okr={keyResult} />
                  </div>
                  <Avatar user={user} />
                  <Comment.Content>
                    <Comment.Author>
                      <UserName user={user} />
                    </Comment.Author>
                    <Comment.Metadata>
                      {moment(updatedAt).format("YYYY/M/D H:mm")}
                    </Comment.Metadata>
                    <Comment.Metadata>
                      <Comment.Actions>
                        <Comment.Action
                          onClick={this.handleDeleteClick.bind(this, v)}>
                          <Icon name="delete" />
                        </Comment.Action>
                      </Comment.Actions>
                    </Comment.Metadata>
                    <Comment.Text>
                      <Markdown text={comment} />
                    </Comment.Text>
                  </Comment.Content>
                </Comment>
              </Comment.Group>
            );
          })}
        </div>
        {comments.size > this.state.displayCommentCount ? (
          <div className="meeting-board__comment__loadmore">
            <a onClick={() => this.handleDisplayComment(VIEW_MORE_COMMENT)}>
              さらに表示
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

LabelItem.propTypes = {
  comments: ImmutablePropTypes.list.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default LabelItem;
