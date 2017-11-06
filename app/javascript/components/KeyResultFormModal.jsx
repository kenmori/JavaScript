import React, { Component } from 'react';
import { Button, Form, Input, Modal, Select } from 'semantic-ui-react';

class KeyResultFormModal extends Component {
  add = () => {
    this.props.addKeyResult(this.props.objective.get('id'), this.nameInput.inputRef.value);
    this.nameInput.inputRef.value = '';
  };

  render() {
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
                <Form.Field control={Select} options={[{ key: '1', text: '富岡', value: '1' }]}/>
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
