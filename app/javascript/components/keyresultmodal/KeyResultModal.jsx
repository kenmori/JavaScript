import React, { Component } from 'react';
import { reduxForm } from 'redux-form'
import { List } from 'immutable'
import { Button, Modal } from 'semantic-ui-react'
import KeyResultSidebar from './KeyResultSidebar'
import KeyResultForm from './KeyResultForm'

class KeyResultModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      members: List(),
      ownerId: null,
      description: '',
      isRequiredTargetValue: false,
    }
  }

  save(validData) {
    const keyResult = {
      name: validData.name,
      description: this.state.description,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      targetValue: validData.targetValue,
      valueUnit: validData.valueUnit,
      expiredDate: validData.expiredDate,
      members: this.state.members.toArray(),
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
        members: List(),
        isRequiredTargetValue: false,
        description: '',
      });
    }

    if (!this.props.isOpen && nextProps.isOpen) {
      this.props.initialize({
        name: '',
        targetValue: '',
        valueUnit: '',
        expiredDate: nextProps.initialExpiredDate,
      })
    }
  }

  isEditing() {
    return this.props.dirty
      || this.state.description !== ''
      || this.state.ownerId !== this.props.objective.get('owner').get('id')
      || this.state.members.size;
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
            <KeyResultForm
              objective={objective}
              users={this.props.users}
              ownerId={this.state.ownerId}
              members={this.state.members}
              isRequiredTargetValue={this.state.isRequiredTargetValue}
              onChange={values => this.setState({ ...values })}
            />
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
