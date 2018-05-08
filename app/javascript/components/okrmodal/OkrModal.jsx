import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import { openObjective, goToRoot } from "../../utils/linker";
import Sidebar from './Sidebar';
import ObjectiveTab from "./ObjectiveTab";
import KeyResultTab from "./KeyResultTab";

class OkrModal extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.removedObjectiveId === this.props.objectiveId) {
      goToRoot();
    } else if (nextProps.removedKeyResultId === this.props.keyResultId) {
      openObjective(this.props.objectiveId);
    }
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
    keyResult.get('members').forEach((item) => {
      if (this.isNotExistMember(users, item)) {
        users = users.push(item);
      }
    })

    return users;
  }  

  modalContentTag(objective, keyResultId) {
    if(!keyResultId) {
      const users = this.selectableObjectiveMembers(this.props.users, this.props.objective);
      return <ObjectiveTab {...this.props} users={users} />;
    } else {
      const keyResult = objective.get('keyResults').find(item => item.get('id') === keyResultId);
      if(!keyResult) {return null;}
      const users = this.selectableKeyResultMembers(this.props.users, keyResult);
      return <KeyResultTab {...this.props} keyResult={keyResult} users={users} />;
    }
  }

  closeModal() {
    goToRoot();
    this.props.closeModal();
  }

  render() {
    const objective = this.props.objective;
    if (!objective) return null;
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='okr-modal' 
        onClose={this.closeModal.bind(this)}
      >
        <Modal.Content scrolling>
          <div className="okr-body">
            <Sidebar 
              objective={objective}
              keyResultOrder={objective.get('keyResultIds')}
              keyResultId={this.props.keyResultId} 
              openKeyResultModal={this.props.openKeyResultModal}
              updateKeyResultOrder={this.props.updateKeyResultOrder}
              canMoveKeyResult={this.props.isObjectiveOwner}
            />
            <div className="okr-main">
              {this.modalContentTag(objective, this.props.keyResultId)}
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
  keyResultId: PropTypes.number,
  users: PropTypes.object,
  isOpen: PropTypes.bool,
};

OkrModal.defaultProps = {
  objective: Map(),
};

export default OkrModal;
