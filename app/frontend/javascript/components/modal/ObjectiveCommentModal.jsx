import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Modal, Header, Form } from "semantic-ui-react";
import StretchCommentPane from "../okrmodal/StretchCommentPane";
import CommentLabelDropdown from "../okrmodal/CommentLabelDropdown";

class ObjectiveCommentModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      text: "",
      commentLabelId: null,
      objectiveId: null,
    };
  }

  componentDidMount() {
    this.setState({ objectiveId: this.props.objectiveId });
  }

  addComment = () => {
    const { text } = this.state;
    if (!text) return;

    this.props.updateObjective({
      id: this.state.objectiveId,
      comment: {
        data: text,
        behavior: "add",
        objective_comment_label: { id: this.state.commentLabelId },
      },
    });
    this.setState({ text: "" });
  };

  removeComment = id => {
    this.props.confirm({
      content: "コメントを削除しますか？",
      onConfirm: () =>
        this.props.updateObjective({
          id: this.state.objectiveId,
          comment: {
            data: id,
            behavior: "remove",
          },
        }),
    });
  };

  editComment = (id, text, label) => {
    if (!text) return;

    this.props.updateObjective({
      id: this.state.objectiveId,
      comment: {
        data: {
          id,
          text,
          objective_comment_label: { id: label },
        },
        behavior: "edit",
      },
    });
  };

  handleTextChange = (e, { value }) => {
    this.setState({ text: value });
  };

  handleDropdownChange = (e, { value }) => {
    this.setState({ commentLabelId: value });
  };

  render() {
    const {
      objective,
      comments,
      commentLabel,
      isOpen,
      closeModal,
    } = this.props;
    const { text } = this.state;
    const name = objective.get("name");

    return (
      <Modal
        closeIcon
        size="small"
        className="comment-modal"
        open={isOpen}
        onClose={closeModal}>
        <Modal.Content scrolling>
          <Header as="h4">{name}</Header>
          <StretchCommentPane
            comments={comments}
            commentLabels={commentLabel}
            onDelete={this.removeComment}
            onUpdate={this.editComment}
          />
          <Form className="comment-modal__form">
            <Form.Group className="comment-modal__form__group">
              <Form.Field className="comment-modal__form__group__field">
                <Form.TextArea
                  autoHeight
                  rows={3}
                  value={text}
                  placeholder={
                    "進捗状況や、次のアクションなどをメモしてください。\n記述したコメントは関係者にメールで通知されます。\n(Markdown を記述できます)"
                  }
                  onChange={this.handleTextChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group className="comment-modal__form__group">
              <CommentLabelDropdown
                commentLabels={commentLabel}
                onChange={this.handleDropdownChange}
              />
              <Form.Field>
                <Form.Button
                  content="投稿する"
                  className="right floated comment-modal__form__group__button"
                  onClick={this.addComment}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

ObjectiveCommentModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  objective: ImmutablePropTypes.map.isRequired,
  objectiveId: PropTypes.number.isRequired,
  commentLabel: ImmutablePropTypes.map.isRequired,
  updateObjective: PropTypes.func.isRequired,
};

export default ObjectiveCommentModal;
