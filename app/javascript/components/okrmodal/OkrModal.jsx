import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
import history from '../../utils/history';
import Sidebar from './Sidebar';
import ObjectivePane from './ObjectivePane';
import KeyResultPane from './KeyResultPane';

class OkrModal extends Component {
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.selectedOkr) {
      this.setState({ 
        selectedOkr: Map({
          okrType: nextProps.selectedOkr.get('okrType'),
          targetId: nextProps.selectedOkr.get('targetId'),
        })
      });
    }
  }

  changeToObjectiveModal(parentKeyResult) {
    this.closeModal();
    this.props.openObjectiveModal(parentKeyResult);
  }

  changeToKeyResultModal(objective) {
    this.closeModal();
    this.props.openKeyResultModal(objective);
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
      if(!keyResult) {return null;}
      const users = this.selectableKeyResultMembers(this.props.users, keyResult);
      return (
        <KeyResultPane
          {...this.props}
          users={users}
          keyResult={keyResult}
          changeToObjectiveModal={parentKeyResult => this.changeToObjectiveModal(parentKeyResult)}
        />
      )
    }
  }

  closeModal() {
    history.push('/');
    this.props.closeModal()
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
        onClose={this.closeModal.bind(this)}
      >
        <Modal.Content scrolling>
          <div className="okr-body">
            <Sidebar 
              objective={objective} 
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
