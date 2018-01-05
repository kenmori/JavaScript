import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import UserSelectBox from './UserSelectBox';
import { Button, Form, Input, Modal, Dropdown, TextArea, Segment, List } from 'semantic-ui-react';

class ObjectiveFormModal extends Component {
  save() {
    const objective = {
      name: this.nameInput.inputRef.value,
      description: findDOMNode(this.descriptionArea).value,
      ownerId: this.ownerSelect.selectedValue,
      parentObjectiveId: this.props.parentObjective ? this.props.parentObjective.get('id') : null,
    };
    this.props.addObjective(objective);
  }

  getRelatedKeyResultForm(relatedKeyResult) {
    if (relatedKeyResult) {
      return (
        <Form.Group widths='equal'>
          <Form.Field>
            <label>割り当てられた Key Result</label>
            <Input value={relatedKeyResult.get('name')} readOnly/>
          </Form.Field>
        </Form.Group>
      );
    }
  }

  render() {
    const objective = this.props.parentObjective;
    const keyResult = this.props.relatedKeyResult;
    const hasObjective = !!objective;
    let modalSize = 'small';
    let wrapperClassName = 'objective-form-modal';
    if (hasObjective) {
      modalSize = 'large';
      wrapperClassName += ' is-keyresult';
    }
    return (
      <Modal open={this.props.isOpen} size={modalSize} className={wrapperClassName}>
        <Modal.Header>
          Objective を決める
        </Modal.Header>
        <Modal.Content>
          <div className="objective-form-modal__body">
            {
              hasObjective && (
                <div className="objective-form-modal__sidebar sidebar">
                  <div className="sidebar__item">
                    <div className="sidebar__title">上位Objective</div>
                    <div className="sidebar__content">
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header>{objective.get('name')}</List.Header>
                            <List.Description>{objective.get('description')}</List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                  <div className="sidebar__item">
                    <div className="sidebar__title">割り当てられた Key Result</div>
                    <div className="sidebar__content">
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header>{keyResult.get('name')}</List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                </div>
              )
            }
            <div className="objective-form-modal__main">
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Objective 名</label>
                    <Input placeholder='Objective 名を入力してください' ref={(node) => { this.nameInput = node; }}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Objective の説明</label>
                    <TextArea autoHeight rows={3} placeholder='どのように Objective を達成するかをメンバーに伝えるために、Objective の説明を2〜3行で入力してください'
                              ref={(node) => { this.descriptionArea = node; }}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>責任者</label>
                    <UserSelectBox
                      users={this.props.users} 
                      defaultValue={this.props.loginUser.get('ownerId')} 
                      ref={node => {this.ownerSelect = node;}}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.props.closeModal}>キャンセル</Button>
            <Button positive onClick={this.save.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

ObjectiveFormModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  parentObjective: PropTypes.object,
  relatedKeyResult: PropTypes.object,
};

export default ObjectiveFormModal;
