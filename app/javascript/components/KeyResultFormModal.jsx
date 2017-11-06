import React, { Component } from 'react';
import { Button, Form, Icon, Input, Modal, Select } from 'semantic-ui-react';

class KeyResultFormModal extends Component {
  add() {
    this.props.addKeyResult(this.props.objective.get('id'), this.nameInput.inputRef.value);
    this.nameInput.inputRef.value = '';
  }
  
  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          {this.props.objective && this.props.objective.get('name')} の KeyResult(主要成果) を作成する<Icon
          name='help circle outline'/>
        </Modal.Header>
        <Modal.Content style={{ margin: '10px 0' }}>
          <Form>
            <Form.Group widths='equal' className='flex' style={{ alignItems: 'flex-end' }}>
              <Form.Field width={6}>
                <label>Objective(目標)名</label>
                <Input placeholder='このObjectiveの達成に必要なKeyResult(主要成果)' ref={(node) => {
                  this.nameInput = node;
                }}/>
              </Form.Field>
              <Form.Field width={2} control={Input} label='KeyResultの期限や目標値'/>
              <Form.Field width={2} control={Input}/>
            </Form.Group>
            <Form.Group widths='equal' className='flex'>
              <Form.Field>
                <label>この KeyResult の達成を誰に依頼しますか？</label>
                <Form.Group>
                  <Form.Field control={Select} options={[{ key: '1', text: '富岡', value: '1' }]}/>
                </Form.Group>
                <Button circular icon='plus' size='mini'/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button color='grey' onClick={this.props.closeModal}><Icon name='remove'/>キャンセル</Button>
            <Button positive onClick={this.add.bind(this)}><Icon name='checkmark'/>保存</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
}
;

export default KeyResultFormModal;
