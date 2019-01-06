import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Form } from "semantic-ui-react";

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
      commentLabels.toArray().map(e => ({
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
