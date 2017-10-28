import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "semantic-ui-react";

class ObjectiveForm extends Component {
  save() {
    const objective = {
      name: this.nameInput.inputRef.value,
      description: this.descriptionInput.inputRef.value
    };
    this.props.addObjective(objective);
    this.nameInput.inputRef.value = "";
    this.descriptionInput.inputRef.value = "";
  }

  render() {
    return (
      <div className="objective-form">
        <h4>Objective を作成する</h4>
        <hr/>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Objective(目標)名</label>
              <Input placeholder="Objective名を入力してください" ref={(node) => {
                this.nameInput = node;
              }}/>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>Objective の説明</label>
              <Input placeholder="Objectiveの説明を入力してください" ref={(node) => {
                this.descriptionInput = node;
              }}/>
            </Form.Field>
          </Form.Group>
          <Form.Group className="button-form-group">
            <Button positive onClick={this.save.bind(this)}>保存</Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

ObjectiveForm.propTypes = {
  addObjective: PropTypes.func.isRequired,
};

export default ObjectiveForm;
