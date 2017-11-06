import React, { Component } from 'react';
import { Button, Form, Input, Modal, Dropdown } from 'semantic-ui-react';

class KeyResultFormModal extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  get usersOption() {
    return this.props.users.map(item => ({
      key: item.get('id'),
      value: item.get('id'),
      text: `${item.get('lastName')} ${item.get('firstName')}`,
    })).toArray();
  }

  add = () => {
    const keyResult = {
      name: this.nameInput.inputRef.value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.ownerSelect.getSelectedItem().value,
      targetValue: this.targetInput.inputRef.value,
      expiredDate: this.dateInput.inputRef.value,
    };
    this.props.addKeyResult(keyResult);
    this.nameInput.inputRef.value = '';
    this.targetInput.inputRef.value = '';
    this.dateInput.inputRef.value = '';
  };

  render() {
    if (this.props.users.isEmpty()) {
      return null;
    }
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          {this.props.objective && this.props.objective.get('name')} の KeyResult を作成する
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Key Result 名</label>
                <Input placeholder='Objective の達成に必要な Key Result' ref={node => {this.nameInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>目標値</label>
                <Input ref={node => {this.targetInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>期限</label>
                <Input ref={node => {this.dateInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>責任者</label>
                <Dropdown selection options={this.usersOption} ref={node => {this.ownerSelect = node;}}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.props.closeModal}>キャンセル</Button>
            <Button positive onClick={this.add}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default KeyResultFormModal;
