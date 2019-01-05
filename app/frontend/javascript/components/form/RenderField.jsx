import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Input, Label } from "semantic-ui-react";

class RenderField extends PureComponent {
  render() {
    const {
      input,
      meta: { touched, error },
    } = this.props;
    return (
      <div className="form-item">
        <Input {...input} error={touched && !!error} />
        {touched && error && (
          <Label basic color="red" pointing>
            {error}
          </Label>
        )}
      </div>
    );
  }
}

RenderField.propTypes = {
  // container
  // component
  placeholder: PropTypes.string,
  // Redux Form
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};

export default RenderField;
