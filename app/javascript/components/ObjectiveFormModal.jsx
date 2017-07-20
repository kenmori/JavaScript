import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox, CustomCalendar, Form, Icon, Input, Modal } from 'semantic-ui-react';

class ObjectiveFormModal extends Component {
  get isNewObjective() {
    return !this.props.objective
  }

  save() {
    const objective = {
      id: this.props.objective && this.props.objective.get('id'),
      name: this.nameInput.inputRef.value,
      description: this.descriptionInput.inputRef.value
    };
    if(this.isNewObjective) {
      this.props.addObjective(objective, this.continueCheckBox.state.checked);
    } else {
      this.props.updateObjective(objective);
    }
    this.nameInput.inputRef.value = '';
    this.descriptionInput.inputRef.value = '';
  }
  
  render() {
    const existedObjective = this.props.objective;
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          { this.isNewObjective ? '新しい Objective(目標) を作成する' : '既存のObjective(目標) を編集する' }
        </Modal.Header>
        <Modal.Content style={{ margin: '10px 0' }}>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective(目標)名</label>
                <Input placeholder='Objective名を入力してください' defaultValue={existedObjective && existedObjective.get('name')} ref={(node) => {
                  this.nameInput = node;
                }}/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective の説明</label>
                <Input placeholder='Objectiveの説明を入力してください' defaultValue={existedObjective && existedObjective.get('description')} ref={(node) => {
                  this.descriptionInput = node;
                }}/>
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {(() => {
            if(this.isNewObjective) {
              return (
                <div className='center continue-check-box'>
                  <Checkbox label={<label>このまま KeyResult の作成を続ける</label>} ref={(node) => {this.continueCheckBox = node;}}/>
                </div>
              );
            }
          })()}
          <div className='center'>
            <Button color='grey' onClick={this.props.closeModal}><Icon name='remove'/>キャンセル</Button>
            <Button positive onClick={this.save.bind(this)}><Icon name='checkmark'/>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

ObjectiveFormModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  objective: PropTypes.object,
  open: PropTypes.bool
};

export default ObjectiveFormModal;
