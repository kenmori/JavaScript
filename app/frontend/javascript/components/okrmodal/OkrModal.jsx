import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Modal } from 'semantic-ui-react'
import DocumentTitle from 'react-document-title'
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
    keyResult.get('members').forEach(item => {
      if (this.isNotExistMember(users, item)) {
        users = users.push(item)
      }
    })

    return users
  }

  handleClose = () => {
    if (this.state.isDirty) {
      this.props.confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => {
          this.setState({ isDirty: false })
          this.closeModal()
        }
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
    const { objective, keyResultId } = this.props
    if (!objective) return null
    const keyResult = objective
      .get('keyResults')
      .find(keyResult => keyResult.get('id') === keyResultId)
    const name = keyResult ? keyResult.get('name') : objective.get('name')
    return (
      <DocumentTitle title={`${name} - Resily`}>
        {this.renderBody(objective, keyResult)}
      </DocumentTitle>
    )
  }

  renderBody(objective, keyResult) {
    const { keyResultId, users } = this.props
    const { isDirty } = this.state
    return (
      <Modal
        closeIcon
        open={this.props.isOpen}
        size="large"
        className="okr-modal"
        onClose={this.handleClose}
      >
        <div className="okr-content">
          <div className="okr-body">
            <OkrSidebar
              objective={objective}
              keyResultOrder={objective.get('keyResultIds')}
              keyResultId={keyResultId}
              openKeyResultModal={this.props.openKeyResultModal}
              updateKeyResultOrder={this.props.updateKeyResultOrder}
              canMoveKeyResult={this.props.isObjectiveOwner}
            />
            <div className="okr-main">
              {keyResult ? (
                <KeyResultTab
                  {...this.props}
                  keyResult={keyResult}
                  users={this.selectableKeyResultMembers(users, keyResult)}
                  isDirty={isDirty}
                  setDirty={this.setDirty}
                />
              ) : (
                <ObjectiveTab
                  {...this.props}
                  users={this.selectableObjectiveMembers(users, objective)}
                  setDirty={this.setDirty}
                />
              )}
            </div>
          </div>
        </div>
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
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired
  // component
}

export default OkrModal
