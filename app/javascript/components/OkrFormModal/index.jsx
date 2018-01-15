import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Modal, Transition, Message } from 'semantic-ui-react';
import Sidebar from './Sidebar'
import ObjectiveDetail from './ObjectiveDetail'
import KeyResultDetail from './KeyResultDetail'


class OkrFormModal extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.selectedOkr) {
      if(nextProps.selectedOkr.get('targetId') !== -1 && this.isRemovedKeyResult(nextProps)) {
        this.showOkrDetail('objective');
      }
      this.setState({ 
        selectedOkr: Map({
          okrType: nextProps.selectedOkr.get('okrType'),
          targetId: nextProps.selectedOkr.get('targetId'),
        })
      });
    }
  }

  isRemovedKeyResult(props) {
    const keyResult = props.objective.get('keyResults');
    const selectedOkr = props.selectedOkr;
    return selectedOkr.get('okrType') === 'keyResult' && 
            !(keyResult && keyResult.find(item => item.get('id') === selectedOkr.get('targetId')))
  }

  showOkrDetail(okrType, targetId) {
    this.props.showOkrDetail(okrType, targetId)
  }

  changeToObjectiveModal(parentObjective, relatedKeyResult) {
    this.props.closeModal();
    this.props.openObjectiveFormModal(parentObjective, relatedKeyResult);
  }

  changeToKeyResultModal(pbjectiv) {
    this.props.closeModal();
    this.props.openKeyResultFormModal(pbjectiv);
  }

  modalContentTag(objective, selectedOkr) {
    if(selectedOkr.get('okrType') === 'objective') {
      return <ObjectiveDetail {...this.props}/>
    } else {
      const keyResult = objective.get('keyResults').find(item => item.get('id') === selectedOkr.get('targetId'));
      let childObjectives = {};
      if(keyResult) {
        childObjectives = objective.get('childObjectives').filter((item) => {
          return item.get('parentKeyResultId') === keyResult.get('id');
        });
      }
      return (
        <KeyResultDetail
          {...this.props}
          keyResult={keyResult}
          childObjectives={childObjectives}
          changeToObjectiveModal={(parentKeyResult) => this.changeToObjectiveModal(objective, parentKeyResult)}
        />
      )
    }
  }

  message() {
    return (
      <Transition visible={!this.props.message} animation='fade' duration={3000} onHide={()=> this.props.clearMessage()}>
        {
          this.props.message ? <Message positive>{this.props.message}</Message> : <span />
        }
      </Transition>
    );
  }

  render() {
    const objective = this.props.objective;
    const selectedOkr = this.props.selectedOkr;
    if (!objective.size) { return null; }

    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='okr-form-modal' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.props.closeModal}
      >
        <Modal.Content>
          <div className="okr-body">
            <Sidebar 
              objective={objective} 
              showOkrDetail={this.showOkrDetail.bind(this)} 
              selectedOkr={this.props.selectedOkr} 
              changeToKeyResultModal={this.changeToKeyResultModal.bind(this)}
            />
            <div className="okr-main">
              {this.message()}
              {this.modalContentTag(objective, selectedOkr)}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

OkrFormModal.propTypes = {
  updateObjective: PropTypes.func,
  updateKeyResult: PropTypes.func,
  openObjectiveFormModal: PropTypes.func,
  openKeyResultFormModal: PropTypes.func,
  closeModal: PropTypes.func,
  removeKeyResult: PropTypes.func,
  objective: PropTypes.object,
  selectedOkr: PropTypes.object,
  users: PropTypes.object,
  isOpen: PropTypes.bool,
};

OkrFormModal.defaultProps = {
  objective: Map(),
};

export default OkrFormModal;
