import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'semantic-ui-react';
import ObjectiveSidebar from './ObjectiveSidebar';
import ObjectiveForm from './ObjectiveForm';

class ObjectiveModal extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ownerId: null,
      parentKeyResultId: null,
      name: '',
      description: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        ownerId: this.getInitialOwnerId(nextProps),
        parentKeyResultId: this.getInitialParentKeyResultId(nextProps),
        name: '',
        description: '',
      });
    }
  }

  save() {
    const objective = {
      name: this.state.name,
      description: this.state.description,
      ownerId: this.state.ownerId,
      parentKeyResultId: this.state.parentKeyResultId,
      okrPeriodId: this.props.okrPeriodId,
    };
    const isNew = !this.props.parentKeyResult; // 上位 KR (初期値) がない = 新規作成
    this.props.addObjective(objective, isNew);
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
    return this.state.name !== ''
      || this.state.ownerId !== this.getInitialOwnerId()
      || this.state.parentKeyResultId !== this.getInitialParentKeyResultId()
      || this.state.description !== '';
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
    const { parentKeyResult } = this.props;
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
        onClose={this.handleClose.bind(this)}
      >
        <Modal.Header>
          Objective を入力する
        </Modal.Header>
        <Modal.Content>
          <div className="objective-modal__body">
            <ObjectiveSidebar parentKeyResult={parentKeyResult} />
            <ObjectiveForm
              parentKeyResultCandidates={this.props.parentKeyResultCandidates}
              users={this.props.users}
              parentKeyResultId={this.state.parentKeyResultId}
              ownerId={this.state.ownerId}
              hasParentKeyResult={hasParentKeyResult}
              isFetchedCandidates={this.props.isFetchedCandidates}
              onChange={values => this.setState({ ...values })}
            />
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

ObjectiveModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  parentKeyResult: PropTypes.object,
};

export default  ObjectiveModal;
