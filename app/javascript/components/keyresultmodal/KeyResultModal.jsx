import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { reduxForm } from 'redux-form'
import { Field } from 'redux-form'
import { Button, Form, Modal, TextArea } from 'semantic-ui-react'
import KeyResultMemberSelect from '../form/KeyResultMemberSelect';
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';
import RequiredLabel from '../form/RequiredLabel';
import moment from 'moment';
import { fromJS } from 'immutable';
import KeyResultSidebar from './KeyResultSidebar'
import RenderField from '../form/RenderField'
import RenderDateField from '../form/RenderDateField'
import { validateKeyResultName, validateTargetValue, validateExpiredDate, normalizeExpiredDate } from '../../utils/validator'

class KeyResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: [],
      ownerId: null,
      isRequiredTargetValue: false,
    }
  }

  changeKeyResultOwner(value) {
    this.setState({
      ownerId: value,
    });
    this.removeMember(value);
  }

  addMember(value) {
    const members = this.state.members;
    members.push(value);
    this.setState({ members });
  }

  removeMember(value) {
    const members = this.state.members;
    members.splice(members.indexOf(value), 1);
    this.setState({ members });
  }

  save(validData) {
    const keyResult = {
      name: validData.name,
      description: findDOMNode(this.refs.descriptionArea).value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      targetValue: validData.targetValue,
      valueUnit: validData.valueUnit,
      expiredDate: validData.expiredDate.format('YYYY-MM-DD'),
      members: this.state.members,
    };
    this.props.addKeyResult(keyResult);
  }

  componentWillReceiveProps(nextProps, currentProps) {
    if (nextProps.objective && this.props.objective !== nextProps.objective) {
      this.setState({
        ownerId: nextProps.objective.get('owner').get('id'),
      });
    }

    const willClose = nextProps.isOpen !== currentProps.isOpen && !nextProps.isOpen;
    if (willClose) {
      this.setState({
        members: [],
        isRequiredTargetValue: false,
      });
    }

    if (!this.props.isOpen && nextProps.isOpen) {
      this.props.initialize({
        name: '',
        targetValue: '',
        valueUnit: '',
        expiredDate: moment(nextProps.initialExpiredDate),
      })
    }
  }

  isEditing() {
    return this.props.dirty
      || findDOMNode(this.refs.descriptionArea).value !== ''
      || this.state.ownerId !== this.props.objective.get('owner').get('id')
      || this.state.members.length;
  }

  handleClose() {
    if(this.isEditing()) {
      this.props.confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => this.closeModal(),
      })
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    // FIXME: キャンセルボタンで背面の OKR 編集モーダルごと閉じてしまう現象を setTimeout で回避する
    // 背面の OKR 編集モーダルのモーダル外クリックが発生している (おそらく Semantic-UI のバグ)
    setTimeout(() => this.props.closeModal(), 0);
  }
  
  render() {
    const { objective, handleSubmit } = this.props
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='keyresult-modal' 
        onClose={this.handleClose.bind(this)}
      >
        <Modal.Header>
          KeyResult を追加する
        </Modal.Header>
        <Modal.Content>
          <div className="keyresult-modal__body">
            <KeyResultSidebar objective={objective} />
            <div className="keyresult-modal__main">
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <RequiredLabel text='Key Result' />
                    <Field
                      name='name'
                      type='text'
                      component={RenderField}
                      validate={[validateKeyResultName]}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>説明</label>
                    <TextArea autoHeight rows={3} ref='descriptionArea'
                              placeholder={`Key Result についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <div className="flex-start">
                      <div style={{marginRight: "10px"}}>
                        <RequiredLabel text='目標値' required={this.state.isRequiredTargetValue} />
                        <div style={{width: "177px"}} >
                          <Field
                            name='targetValue'
                            type='text'
                            component={RenderField}
                            validate={[validateTargetValue]}
                          />
                        </div>
                      </div>
                      <div>
                        <label>単位</label>
                        <Field
                          name='valueUnit'
                          type='text'
                          placeholder='例：円、件、人'
                          component={RenderField}
                          onChange={(e, newValue) => this.setState({ isRequiredTargetValue: !!newValue })}
                        />
                      </div>
                    </div>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <RequiredLabel text='期限' />
                    <Field
                      name='expiredDate'
                      component={RenderDateField}
                      validate={[validateExpiredDate]}
                      normalize={normalizeExpiredDate}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <RequiredLabel text='責任者' />
                    <UserSelect
                      users={this.props.users} 
                      value={this.state.ownerId}
                      onChange={value => this.changeKeyResultOwner(value)}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>関係者</label>
                    <KeyResultMemberSelect
                      users={this.props.users}
                      members={this.state.members}
                      excludedId={this.state.ownerId}
                      add={this.addMember.bind(this)}
                      remove={this.removeMember.bind(this)}
                    />
                  </Form.Field>
                </Form.Group>
                {objective && (
                  <Form.Field>
                    <RequiredLabel text='紐付く Objective' />
                    <OkrSelect
                      okrs={fromJS([objective])}
                      value={objective.get('id')}
                      preview={false}
                      disabled={!!objective}
                      onChange={value => {}}
                    />
                  </Form.Field>
                )}
              </Form>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.handleClose.bind(this)}>キャンセル</Button>
            <Button positive onClick={handleSubmit(data => this.save(data))}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'keyResultModal',
})(KeyResultModal)
