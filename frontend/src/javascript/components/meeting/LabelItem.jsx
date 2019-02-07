import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Comment, Icon } from "semantic-ui-react";
import moment from "moment";
import OkrName from "../util/OkrName";
import Markdown from "../atoms/Markdown";
import UserName from "../util/UserName";
import Avatar from "../util/Avatar";

class LabelItem extends PureComponent {
  constructor(props) {
    super(props);
  }

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

    return (
      <div className="meeting-board__comment">
        <div>
          {comments.map(v => {
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
