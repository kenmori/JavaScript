import React, { PureComponent } from 'react'
import { Map } from 'immutable'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Modal } from 'semantic-ui-react'
import { openObjective, goToRoot } from '../../utils/linker'
import OkrSidebar from './OkrSidebar'
import ObjectiveTab from './ObjectiveTab'
import KeyResultTab from './KeyResultTab'

class OkrModal extends PureComponent {

  constructor() {
    super()
    this.state = { isDirty: false }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.removedObjectiveId === this.props.objectiveId) {
      goToRoot()
    } else if (nextProps.removedKeyResultId === this.props.keyResultId) {
      openObjective(this.props.objectiveId)
    }
  }

  setDirty = isDirty => this.setState({ isDirty })

  isNotExistMember(users, targetUser) {
    return !users.find(item => item.get('id') === targetUser.get('id'))
  }

  selectableObjectiveMembers(users, objective) {
    if (this.isNotExistMember(users, objective.get('owner'))) {
      users = users.push(objective.get('owner'))
    }
    return users
  } 

  selectableKeyResultMembers(users, keyResult) {
    if (this.isNotExistMember(users, keyResult.get('owner'))) {
      users = users.push(keyResult.get('owner'))
    }
    keyResult.get('members').forEach((item) => {
      if (this.isNotExistMember(users, item)) {
        users = users.push(item)
      }
    })

    return users
  }  

  modalContentTag(objective, keyResultId) {
    if(!keyResultId) {
      const users = this.selectableObjectiveMembers(this.props.users, this.props.objective)
      return <ObjectiveTab {...this.props} users={users} />
    } else {
      const keyResult = objective.get('keyResults').find(item => item.get('id') === keyResultId)
      if(!keyResult) {return null}
      const users = this.selectableKeyResultMembers(this.props.users, keyResult)
      const { isDirty } = this.state
      return <KeyResultTab {...this.props} keyResult={keyResult} users={users} isDirty={isDirty} setDirty={this.setDirty} />
    }
  }

  handleClose = () => {
    if (this.state.isDirty) {
      this.props.confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => {
          this.setState({ isDirty: false })
          this.closeModal()
        },
      })
    } else {
      this.closeModal()
    }
  }

  closeModal = () => {
    goToRoot()
    this.props.closeModal()
  }

  render() {
    const objective = this.props.objective
    if (!objective) return null
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='okr-modal' 
        onClose={this.handleClose}
      >
        <Modal.Content scrolling>
          <div className="okr-body">
            <OkrSidebar 
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
    )
  }
}

OkrModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  objectiveId: PropTypes.number,
  objective: ImmutablePropTypes.map,
  keyResultId: PropTypes.number,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  objectiveCandidates: ImmutablePropTypes.list.isRequired,
  parentKeyResultCandidates: ImmutablePropTypes.list.isRequired,
  isFetchedObjectiveCandidates: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  removedObjectiveId: PropTypes.number,
  removedKeyResultId: PropTypes.number,
  isObjectiveOwner: PropTypes.bool.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  openKeyResultModal: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
}

OkrModal.defaultProps = {
  objective: Map(),
}

export default OkrModal
