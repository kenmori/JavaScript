import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal, Segment, Dropdown } from 'semantic-ui-react';
import Sidebar from './Sidebar'
import ObjectiveDetail from './ObjectiveDetail'
import KeyResultDetail from './KeyResultDetail'

class OkrFormModal extends Component {
  constructor(props) {
    super(props);
  }

  getUsersOption(users) {
    return users.map(user => {
      const id = user.get('ownerId');
      return {
        key: id,
        value: id,
        text: `${user.get('lastName')} ${user.get('firstName')}`,
      }
    }).toArray();
  }

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

  handleProgressChange(keyResults, index, progressRate) {
    const totalProgressRate = this.getTotalProgressRate(keyResults, index, progressRate);
    this.props.updateObjective({ id: this.props.objective.get('id'), progressRate: totalProgressRate });
  }

  getTotalProgressRate(keyResults, index, progressRate) {
    const totalProgressRate = keyResults.map((keyResult, i) =>
      i === index ? progressRate : keyResult.get('progressRate')
    ).reduce((sum, x) => sum + x) / keyResults.size;
    return Math.round(totalProgressRate);
  }

  showOkrDetail(okrType, targetId) {
    this.props.showOkrDetail(okrType, targetId)
  }

  render() {
    const objective = this.props.objective;
    const selectedOkr = this.props.selectedOkr;
    if (!objective.size) { return null; }
    return (
      <Modal open={this.props.isOpen} size='small' className='okr-form-modal'>
        <Modal.Content>
          <div className="okr-body">
            {<Sidebar objective={objective} showOkrDetail={this.showOkrDetail.bind(this)} selectedOkr={this.props.selectedOkr} />}
            <div className="okr-main">
              {selectedOkr.get('okrType') === 'objective' ? 
                <ObjectiveDetail {...this.props}/> : 
                <KeyResultDetail
                  users={this.props.users}
                  keyResult={objective.get('keyResults').find(item => item.get('id') === selectedOkr.get('targetId'))}
                  updateKeyResult={this.props.updateKeyResult}
                  index={1}
                  removeKeyResult={this.props.removeKeyResult}
                  onProgressChange={(index, progressRate) => this.handleProgressChange(objective.get('keyResults'), index, progressRate)}
                />
              }
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button color='grey' onClick={this.props.closeModal}><Icon name='remove'/>閉じる</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

OkrFormModal.propTypes = {
  updateObjective: PropTypes.func,
  updateKeyResult: PropTypes.func,
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
