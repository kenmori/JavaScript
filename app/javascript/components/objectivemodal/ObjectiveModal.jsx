import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Tab } from 'semantic-ui-react';
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
      objectiveId: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        ownerId: this.getInitialOwnerId(nextProps),
        parentKeyResultId: this.getInitialParentKeyResultId(nextProps),
        name: '',
        description: '',
        objectiveId: null,
      });
    }
  }

  save() {
    if (!this.state.objectiveId) {
      const objective = {
        name: this.state.name,
        description: this.state.description,
        ownerId: this.state.ownerId,
        parentKeyResultId: this.state.parentKeyResultId,
        okrPeriodId: this.props.okrPeriodId,
      };
      const isNew = !this.props.parentKeyResult; // 上位 KR (初期値) がない = 新規作成
      this.props.addObjective(objective, isNew);
    } else {
      const objective = {
        id: this.state.objectiveId,
        name: this.state.name,
        description: this.state.description,
        objectiveMember: { user: this.state.ownerId },
        parentKeyResultId: this.state.parentKeyResultId,
      };
      this.props.updateObjective(objective);
    }
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

  getObjectiveFormHtml = (isNew = true) => {
    return (
      <Tab.Pane>
        <ObjectiveForm
          parentKeyResultCandidates={this.props.parentKeyResultCandidates}
          users={this.props.users}
          parentKeyResultId={this.state.parentKeyResultId}
          ownerId={this.state.ownerId}
          hasParentKeyResult={!!this.props.parentKeyResult}
          isFetchedCandidates={this.props.isFetchedCandidates}
          onChange={values => this.setState({ ...values })}
          name={this.state.name}
          description={this.state.description}
          objectives={isNew ? undefined : this.props.objectives.filter(objective => !objective.get('parentKeyResultId'))}
          objectiveId={isNew ? undefined : this.state.objectiveId}
        />
      </Tab.Pane>
    );
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
            <Tab panes={[
              { menuItem: '新規作成', render: () => this.getObjectiveFormHtml() },
              { menuItem: '既存 OKR 紐付け', render: () => this.getObjectiveFormHtml(false) },
            ]} />
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
