import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Form } from "semantic-ui-react";
import meetingBoardCommentLabels from "../../constants/meetingBoardCommentLabels";

class CommentLabelDropdown extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const { commentLabels, defaultValue, onChange } = this.props;
    const options = [
      {
        key: "",
        value: "",
        text: "",
      },
    ].concat(
      commentLabels
        // 健康・健全性は過去存在していたラベルで今は存在しない
        // ただし過去からのユーザは健康・健全性ラベルのついたコメントが残っているので
        // ラベルとしては残すが新規投稿はさせない
        .filter(e => e.get("name") !== meetingBoardCommentLabels.HEALTH)
        .toArray()
        .map(e => ({
          key: e.get("id"),
          value: e.get("id"),
          text: e.get("name"),
          label: { color: e.get("color"), empty: true, circular: true },
        })),
    );
    const value = defaultValue != null ? defaultValue : "";

    return (
      <Form.Dropdown
        placeholder="ラベル"
        selection
        labeled
        options={options}
        defaultValue={value}
        onChange={onChange}
      />
    );
  }
}

CommentLabelDropdown.propTypes = {
  // container
  // component
  commentLabels: ImmutablePropTypes.list.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default CommentLabelDropdown;