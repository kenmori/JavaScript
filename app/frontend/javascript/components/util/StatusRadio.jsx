import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Radio } from "semantic-ui-react";

class StatusRadio extends PureComponent {
  handleChange = (e, { checked, value }) => {
    if (checked) {
      this.props.onChange(value);
    }
  };

  render() {
    const { status } = this.props;
    return (
      <div className="status-radio">
        <Radio
          className="green"
          toggle
          label="順調"
          name="status"
          value="green"
          checked={status === "green"}
          onChange={this.handleChange}
        />
        <Radio
          className="yellow"
          toggle
          label="注意"
          name="status"
          value="yellow"
          checked={status === "yellow"}
          onChange={this.handleChange}
        />
        <Radio
          className="red"
          toggle
          label="危険"
          name="status"
          value="red"
          checked={status === "red"}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

StatusRadio.propTypes = {
  // container
  // component
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default StatusRadio;
