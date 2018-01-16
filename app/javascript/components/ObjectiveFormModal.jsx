import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import UserSelectBox from './UserSelectBox';
import { Button, Form, Input, Modal, TextArea, List } from 'semantic-ui-react';

class ObjectiveFormModal extends Component {

  save() {
    const objective = {
      name: this.nameInput.inputRef.value,
      description: findDOMNode(this.descriptionArea).value,
      ownerId: this.ownerSelect.selectedValue,
      parentObjectiveId: this.props.parentObjective ? this.props.parentObjective.get('id') : null,
      parentKeyResultId: this.props.relatedKeyResult ? this.props.relatedKeyResult.get('id') : null,
      okrPeriodId: this.props.okrPeriodId,
    };
    this.props.addObjective(objective);
  }

  getInitialOwnerId() {
    return this.props.relatedKeyResult
      ? this.props.relatedKeyResult.get('owner').get('id')
      : this.props.currentUserId;
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

  isEditing() {
    if (
      this.nameInput.inputRef.value !== '' ||
      findDOMNode(this.descriptionArea).value !== '' ||
      this.ownerSelect.selectedValue !== this.getInitialOwnerId()
    ) {
      return true;
    }

    return false;
  }

  handleClose() {
    if(this.isEditing()) {
      if(confirm('編集中の内容を破棄します。よろしいですか？')) {
        this.props.closeModal();
      }
    } else {
      this.props.closeModal();
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
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size={modalSize} 
        className={wrapperClassName}
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.handleClose.bind(this)}
      >
        <Modal.Header>
          Objective を入力する
        </Modal.Header>
        <Modal.Content>
          <div className="objective-form-modal__body">
            {
              hasObjective && (
                <div className="objective-form-modal__sidebar sidebar">
                  <div className="sidebar__item">
                    <div className="sidebar__title">上位 Objective</div>
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
                    <div className="sidebar__title">割り当てる Key Result</div>
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
                    <label>Objective</label>
                    <Input placeholder='Objective を入力してください' ref={(node) => { this.nameInput = node; }}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Objective の説明</label>
                    <TextArea autoHeight rows={3} placeholder={`Objective についての説明や補足を入力してください。
説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`} ref={(node) => { this.descriptionArea = node; }}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>責任者</label>
                    <UserSelectBox
                      users={this.props.users} 
                      defaultValue={this.getInitialOwnerId()}
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
            <Button onClick={this.handleClose.bind(this)}>キャンセル</Button>
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
