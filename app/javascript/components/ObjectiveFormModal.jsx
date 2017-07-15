import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, CustomCalendar, Form, Icon, Input, Modal } from 'semantic-ui-react';

class ObjectiveFormModal extends Component {
  add() {
    this.props.addObjective(this.nameInput.inputRef.value, this.descriptionInput.inputRef.value, this.continueCheckBox.state.checked);
    this.nameInput.inputRef.value = '';
    this.descriptionInput.inputRef.value = '';
  }
  
  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          新しい Objective(目標) を作成する
        </Modal.Header>
        <Modal.Content style={{ margin: '10px 0' }}>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective(目標)名</label>
                <Input placeholder='Objective名を入力してください' ref={(node) => {
                  this.nameInput = node;
                }}/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective の説明</label>
                <Input placeholder='Objectiveの説明を入力してください' ref={(node) => {
                  this.descriptionInput = node;
                }}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className='center continue-check-box'>
            <Checkbox label={<label>このまま KeyResult の作成を続ける</label>} ref={(node) => {
              this.continueCheckBox = node;
            }}/>
          </div>
          <div className='center'>
            <Button color='grey' onClick={this.props.closeModal}><Icon name='remove'/>キャンセル</Button>
            <Button positive onClick={this.add.bind(this)}><Icon name='checkmark'/>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

ObjectiveFormModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default ObjectiveFormModal;
