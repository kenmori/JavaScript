import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import Sidebar from './Sidebar'
import ObjectivePane from './ObjectivePane'
import KeyResultPane from './KeyResultPane'

class OkrModal extends Component {

  componentWillReceiveProps(nextProps) {
    if (!!nextProps.selectedOkr) {
      if (this.isRemovedKeyResult(nextProps)) {
        this.showOkrPane('objective');
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
    if (!props.objective) return false;
    const keyResult = props.objective.get('keyResults');
    const selectedOkr = props.selectedOkr;
    return selectedOkr.get('okrType') === 'keyResult' && 
            !(keyResult && keyResult.find(item => item.get('id') === selectedOkr.get('targetId')))
  }

  showOkrPane(okrType, targetId) {
    this.props.showOkrPane(okrType, targetId)
  }

  changeToObjectiveModal(parentObjective, relatedKeyResult) {
    this.props.closeModal();
    this.props.openObjectiveModal(parentObjective, relatedKeyResult);
  }

  changeToKeyResultModal(pbjectiv) {
    this.props.closeModal();
    this.props.openKeyResultModal(pbjectiv);
  }

  isNotExistMember(users, targetUser) {
    return !users.find(item => item.get('id') === targetUser.get('id'));
  }

  selectableObjectiveMembers(users, objective) {
    if (this.isNotExistMember(users, objective.get('owner'))) {
      users = users.push(objective.get('owner'));
    }
    return users;
  } 

  selectableKeyResultMembers(users, keyResult) {

    if (this.isNotExistMember(users, keyResult.get('owner'))) {
      users = users.push(keyResult.get('owner'));
    }
    keyResult.get('keyResultMembers').forEach((item) => {
      if (this.isNotExistMember(users, item)) {
        users = users.push(item);
      }
    })

    return users;
  }  

  modalContentTag(objective, selectedOkr) {
    if(selectedOkr.get('okrType') === 'objective') {
      const users = this.selectableObjectiveMembers(this.props.users, this.props.objective);
      return <ObjectivePane {...this.props} users={users}/>
    } else {
      const keyResult = objective.get('keyResults').find(item => item.get('id') === selectedOkr.get('targetId'));
      const users = this.selectableKeyResultMembers(this.props.users, keyResult);
      return (
        <KeyResultPane
          {...this.props}
          users={users}
          keyResult={keyResult}
          changeToObjectiveModal={(parentKeyResult) => this.changeToObjectiveModal(objective, parentKeyResult)}
        />
      )
    }
  }

  render() {
    const objective = this.props.objective;
    const selectedOkr = this.props.selectedOkr;
    if (!objective) { return null; }

    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='okr-modal' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.props.closeModal}
      >
        <Modal.Content>
          <div className="okr-body">
            <Sidebar 
              objective={objective} 
              showOkrPane={this.showOkrPane.bind(this)} 
              selectedOkr={this.props.selectedOkr} 
              changeToKeyResultModal={this.changeToKeyResultModal.bind(this)}
            />
            <div className="okr-main">
              {this.modalContentTag(objective, selectedOkr)}
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

OkrModal.propTypes = {
  updateObjective: PropTypes.func,
  updateKeyResult: PropTypes.func,
  openObjectiveModal: PropTypes.func,
  openKeyResultModal: PropTypes.func,
  closeModal: PropTypes.func,
  removeKeyResult: PropTypes.func,
  objective: PropTypes.object,
  selectedOkr: PropTypes.object,
  users: PropTypes.object,
  isOpen: PropTypes.bool,
};

OkrModal.defaultProps = {
  objective: Map(),
};

export default OkrModal;
