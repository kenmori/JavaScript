import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input, Modal } from 'semantic-ui-react';

class ObjectiveFormModal extends Component {
  save() {
    const objective = {
      name: this.nameInput.inputRef.value,
      description: this.descriptionInput.inputRef.value
    };
    this.props.addObjective(objective);
  }

  render() {
    return (
      <Modal open={this.props.isOpen} size='small' className='objective-form-modal'>
        <Modal.Header>
          <h1>Objective を作成する</h1>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective 名</label>
                <Input placeholder='Objective 名を入力してください' ref={(node) => { this.nameInput = node; }}/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>説明</label>
                <Input placeholder='Objective の説明を入力してください' ref={(node) => { this.descriptionInput = node; }}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button color='grey' onClick={this.props.closeModal}>キャンセル</Button>
            <Button positive onClick={this.save.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

ObjectiveFormModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
};

export default ObjectiveFormModal;
