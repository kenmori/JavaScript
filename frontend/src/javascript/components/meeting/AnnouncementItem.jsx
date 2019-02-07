import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Comment, Icon } from "semantic-ui-react";
import moment from "moment";
import Markdown from "../atoms/Markdown";
import UserName from "../util/UserName";
import Avatar from "../util/Avatar";

class AnnouncementItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  handleDeleteClick = comment => {
    const { objectiveId, updateObjective, confirm } = this.props;

    confirm({
      content: "アナウンスメントをミーティングボードから非表示にしますか？",
      onConfirm: () => {
        updateObjective({
          id: objectiveId,
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

            return (
              <Comment.Group
                key={v.get("id")}
                className="okr-comment-text-only">
                <Comment>
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

AnnouncementItem.propTypes = {
  objectiveId: PropTypes.number.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  updateObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default AnnouncementItem;
