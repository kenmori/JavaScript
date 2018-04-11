import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';
import RenderField from '../form/RenderField';
import { Button, Form, Modal, TextArea, List } from 'semantic-ui-react';

class ObjectiveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerId: null,
      parentKeyResultId: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen && !nextProps.isOpen) {
      this.props.initialize({
        name: ""
      });
    }

    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        ownerId: this.getInitialOwnerId(nextProps),
        parentKeyResultId: this.getInitialParentKeyResultId(nextProps),
      });
    }
  }

  save(validData) {
    const objective = {
      description: findDOMNode(this.refs.descriptionArea).value,
      ownerId: this.state.ownerId,
      parentKeyResultId: this.state.parentKeyResultId,
      okrPeriodId: this.props.okrPeriodId,
    };
    this.props.addObjective(Object.assign(objective, validData));
  }

  getInitialOwnerId(props = this.props) {
    return props.parentKeyResult
      ? props.parentKeyResult.get('owner').get('id')
      : props.currentUserId;
  }
  
  getInitialParentKeyResultId(props = this.props) {
    return props.parentKeyResult
      ? props.parentKeyResult.get('id')
      : null;
  }

  isEditing() {
    return this.state.ownerId !== this.getInitialOwnerId()
      || this.state.parentKeyResultId !== this.getInitialParentKeyResultId()
      || findDOMNode(this.refs.descriptionArea).value !== '';
  }

  handleClose() {
    if(this.isEditing()) {
      this.props.confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => this.closeModal(),
      });
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.props.closeModal();
  }

  render() {
    const { parentKeyResult, handleSubmit } = this.props;
    const hasParentKeyResult = !!parentKeyResult;
    let modalSize = 'small';
    let wrapperClassName = 'objective-modal';
    if (hasParentKeyResult) {
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
          <div className="objective-modal__body">
            {
              hasParentKeyResult && (
                <div className="objective-modal__sidebar sidebar">
                  <div className="sidebar__item">
                    <div className="sidebar__title">上位 Objective</div>
                    <div className="sidebar__content">
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header>{parentKeyResult.getIn(['objective', 'name'])}</List.Header>
                            <List.Description>{parentKeyResult.getIn(['objective', 'description'])}</List.Description>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                  <div className="sidebar__item">
                    <div className="sidebar__title">上位 Key Result</div>
                    <div className="sidebar__content">
                      <List>
                        <List.Item>
                          <List.Content>
                            <List.Header>{parentKeyResult.get('name')}</List.Header>
                          </List.Content>
                        </List.Item>
                      </List>
                    </div>
                  </div>
                </div>
              )
            }
            <div className="objective-modal__main">
              <Form>
                <Form.Field>
                  <label>Objective</label>
                  <Field
                    name="name"
                    type="text"
                    component={RenderField}
                  />
                </Form.Field>
                <Form.Field>
                  <label>説明</label>
                  <TextArea autoHeight rows={3} ref='descriptionArea'
                            placeholder={`Objective についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                  />
                </Form.Field>
                <Form.Field>
                  <label>責任者</label>
                  <UserSelect
                    users={this.props.users}
                    value={this.state.ownerId}
                    onChange={value => this.setState({ ownerId: value })}
                  />
                </Form.Field>
                <Form.Field>
                  <label>上位 Key Result</label>
                  <OkrSelect
                    okrs={this.props.keyResults}
                    isObjective={false}
                    value={this.state.parentKeyResultId}
                    preview={false}
                    disabled={hasParentKeyResult}
                    loading={!this.props.isFetchedKeyResults}
                    onChange={value => this.setState({ parentKeyResultId: value })}
                  />
                </Form.Field>
              </Form>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.handleClose.bind(this)}>キャンセル</Button>
            <Button positive onClick={handleSubmit(data => {
              this.save(data)
            })}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

ObjectiveModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  parentKeyResult: PropTypes.object,
};

export default reduxForm({
  form: 'objectiveModal',
  validate: (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Objective を入力してください'
    }
    return errors
  },
  shouldError: () => true,
})(ObjectiveModal)