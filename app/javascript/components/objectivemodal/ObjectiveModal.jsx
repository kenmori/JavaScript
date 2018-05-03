import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form';
import { Button, Modal, Tab } from 'semantic-ui-react';
import ObjectiveSidebar from './ObjectiveSidebar';
import ObjectiveForm from './ObjectiveForm';

class ObjectiveModal extends Component {

  static INDEX_NEW = 0;
  // noinspection JSUnusedGlobalSymbols
  static INDEX_LINK = 1;

  constructor(props) {
    super(props);
    this.state = {
      ownerId: null,
      description: '',
      activeIndex: ObjectiveModal.INDEX_NEW,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        ownerId: this.getInitialOwnerId(nextProps),
        description: '',
        activeIndex: ObjectiveModal.INDEX_NEW,
      });
      this.props.initialize({
        name: '',
        parentKeyResultId: nextProps.parentKeyResult ? nextProps.parentKeyResult.get('id') : null,
        objectiveId: null,
      });
    }
  }

  save(validData) {
    if (this.state.activeIndex === ObjectiveModal.INDEX_NEW) {
      const objective = {
        name: validData.name,
        description: this.state.description,
        ownerId: this.state.ownerId,
        parentKeyResultId: validData.parentKeyResultId,
        okrPeriodId: this.props.okrPeriodId,
      };
      const isNew = !this.props.parentKeyResult; // 上位 KR (初期値) がない = 新規作成
      this.props.addObjective(objective, isNew);
    } else {
      const objective = {
        id: validData.objectiveId,
        name: validData.name,
        description: this.state.description,
        objectiveMember: { user: this.state.ownerId },
        parentKeyResultId: validData.parentKeyResultId,
      };
      this.props.updateObjective(objective);
    }
  }

  getInitialOwnerId(props = this.props) {
    return props.parentKeyResult
      ? props.parentKeyResult.get('owner').get('id')
      : props.currentUserId;
  }

  isEditing() {
    return this.props.dirty
      || this.state.ownerId !== this.getInitialOwnerId()
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
          isNew={isNew}
          parentKeyResultCandidates={this.props.parentKeyResultCandidates}
          users={this.props.users}
          ownerId={this.state.ownerId}
          hasParentKeyResult={!!this.props.parentKeyResult}
          isFetchedCandidates={this.props.isFetchedCandidates}
          onChange={values => this.setState({ ...values })}
          fieldChange={this.props.change}
          description={this.state.description}
          objectives={isNew ? undefined : this.props.objectives.filter(objective => !objective.get('parentKeyResultId'))}
        />
      </Tab.Pane>
    );
  }

  render() {
    const { parentKeyResult, isOpen, handleSubmit } = this.props;
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
        open={isOpen}
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
            ]} onTabChange={(e, { activeIndex }) => this.setState({ activeIndex })} />
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

ObjectiveModal.propTypes = {
  addObjective: PropTypes.func.isRequired,
  parentKeyResult: PropTypes.object,
};

export default reduxForm({
  form: 'objectiveModal',
})(ObjectiveModal);
