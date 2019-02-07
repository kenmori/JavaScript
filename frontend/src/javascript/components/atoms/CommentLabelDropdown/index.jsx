import React from "react";
import { Form } from "semantic-ui-react";
import meetingBoardCommentLabels from "../../../constants/meetingBoardCommentLabels";

const CommentLabelDropdown = React.memo(
  ({ commentLabels, defaultValue, onChange }) => {
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
  },
);

export default CommentLabelDropdown;
