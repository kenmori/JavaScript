import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Form, Label } from "semantic-ui-react";
import NumberInput from "../form/NumberInput";
import OkrDescription from "../form/OkrDescription";
import PopupLabel from "../util/PopupLabel";
import AutoInput from "../form/AutoInput";
import StretchCommentPane from "./StretchCommentPane";
import CommentLabelDropdown from "./CommentLabelDropdown";

class ObjectivePane extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { progressRate: props.objective.get("progressRate") };
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.objective.get("progressRate") !==
      nextProps.objective.get("progressRate")
    ) {
      this.setState({ progressRate: nextProps.objective.get("progressRate") });
    }
  }

  handleProgressRateChange = progressRate => this.setState({ progressRate });

  handleProgressRateCommit = progressRate =>
    this.props.updateObjective({ progressRate: progressRate || null });

  handleSubProgressRateClick = () =>
    this.props.updateObjective({ progressRate: null });

  handleDescriptionCommit = description =>
    this.props.updateObjective({ description });

  subProgressRateHtml(objective) {
    const progressRate = objective.get("progressRate");
    const subProgressRate = objective.get("subProgressRate");
    return (
      typeof subProgressRate === "number" &&
      progressRate !== subProgressRate && (
        <div className="flex-field__item">
          <PopupLabel
            icon="unlinkify"
            text={`Key Result 一覧 の進捗は ${subProgressRate}% です`}
            tips="クリックすると Key Result 一覧の進捗が設定されます"
            onClick={this.handleSubProgressRateClick}
          />
        </div>
      )
    );
  }

  parentKeyResultProgressRateHtml(parentKeyResult) {
    if (!parentKeyResult) return null;
    const progressRate = parentKeyResult.get("progressRate");
    const subProgressRate = parentKeyResult.get("subProgressRate");
    return (
      typeof subProgressRate === "number" &&
      progressRate !== subProgressRate && (
        <div className="flex-field__item--block">
          <Label
            pointing="above"
            content={`上位 Key Result の進捗は ${subProgressRate}% から ${progressRate}% に変更されています`}
          />
        </div>
      )
    );
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value });
    this.props.setDirty(!!value);
  };

  handleDropdownChange = (e, { value }) => {
    this.setState({ commentLabel: value });
  };

  handleResultCommit = result => this.props.updateObjective({ result });

  addComment = () => {
    const { text, commentLabel } = this.state;
    if (!text) return;

    this.props.updateObjective({
      comment: {
        data: text,
        behavior: "add",
        objective_comment_label: { id: commentLabel },
      },
    });
    this.setState({ text: "" });
    this.props.setDirty(false);
  };

  removeComment = id => {
    this.props.confirm({
      content: "コメントを削除しますか？",
      onConfirm: () =>
        this.props.updateObjective({
          comment: { data: id, behavior: "remove" },
        }),
    });
  };

  editComment = (id, text, label) => {
    if (!text) return;

    this.props.updateObjective({
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

  render() {
    const objective = this.props.objective;
    const { progressRate } = this.state;
    const comments = objective.get("comments");
    const { text } = this.state;
    const objectiveCommentLabels = this.props.objectiveCommentLabels;

    return (
      <Form>
        <Form.Field className="flex-field">
          <label>進捗</label>
          <div className="flex-field__item">
            <NumberInput
              label="%"
              value={progressRate}
              onChange={this.handleProgressRateChange}
              onCommit={this.handleProgressRateCommit}
            />
          </div>
          <div className="flex-field__item slider">
            <NumberInput
              type="range"
              value={progressRate}
              onChange={this.handleProgressRateChange}
              onMouseUp={this.handleProgressRateCommit}
            />
          </div>
          {this.subProgressRateHtml(objective)}
          {this.parentKeyResultProgressRateHtml(
            objective.get("parentKeyResult"),
          )}
        </Form.Field>

        <Form.Field>
          <label>説明</label>
          <OkrDescription
            text={objective.get("description")}
            onCommit={this.handleDescriptionCommit}
          />
        </Form.Field>

        <Form.Field className="flex-field">
          <label>結果</label>
          <div className="flex-field__item">
            <AutoInput
              value={objective.get("result") || ""}
              placeholder="Objective の最終的な進捗を補足する結果を入力してください"
              onCommit={this.handleResultCommit}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <label>コメント ({comments ? comments.size : 0})</label>
          <div className="comment-pane">
            {comments ? (
              <StretchCommentPane
                comments={comments}
                commentLabels={objectiveCommentLabels}
                onDelete={this.removeComment}
                onUpdate={this.editComment}
              />
            ) : null}
            <Form.TextArea
              autoHeight
              rows={3}
              value={text}
              onChange={this.handleTextChange}
              placeholder={
                "進捗状況や、次のアクションなどをメモしてください。\n記述したコメントは関係者にメールで通知されます。\n(Markdown を記述できます)"
              }
            />
            <div className="comment-pane__block">
              <Form.Group className="group">
                <CommentLabelDropdown
                  commentLabels={objectiveCommentLabels}
                  onChange={this.handleDropdownChange}
                />
                <Form.Button content="投稿する" onClick={this.addComment} />
              </Form.Group>
            </div>
          </div>
        </Form.Field>
      </Form>
    );
  }
}

ObjectivePane.propTypes = {
  // container
  disableObjective: PropTypes.func.isRequired,
  // component
  objective: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isAdmin: PropTypes.bool.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ObjectivePane;
