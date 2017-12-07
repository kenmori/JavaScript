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
    this.state = { 
      sliderValue: 0,
      selectedOkr: Map({
        okrType: 'objective',
        targetId: null,
      })
    };
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
    this.setState({ sliderValue: nextProps.objective.get('progressRate') });
  }

  handleProgressChange(index, progressRate) {
    const totalProgressRate = this.getTotalProgressRate(this.props.keyResults, index, progressRate);
    this.setState({ sliderValue: totalProgressRate });
  }

  updateProgress(progressRate) {
    this.updateObjective({ progressRate: progressRate });
  }

  updateObjective(values) {
    this.props.updateObjective({ id: this.props.objective.get('id'), ...values });
  }

  showDetail(okrType, targetId) {
    this.setState({
      selectedOkr: Map({
        okrType,
        targetId,
      })
    });
  }

  render() {
    const objective = this.props.objective;
    const selectedOkr = this.state.selectedOkr;
    if (!objective.size) { return null; }
    return (
      <Modal open={this.props.isOpen} size='small' className='okr-form-modal'>
        <Modal.Content>
          <div className="okr-body">
            {<Sidebar objective={objective} showDetail={this.showDetail.bind(this)} selectedOkr={selectedOkr} />}
            <div className="okr-main">
              {selectedOkr.get('okrType') === 'objective' ? 
                <ObjectiveDetail {...this.props}/> : 
                <KeyResultDetail
                  users={this.props.users}
                  keyResult={objective.get('keyResults').find(item => item.get('id') === selectedOkr.get('targetId'))}
                  updateKeyResult={this.props.updateKeyResult}
                  index={1}
                  updateProgress={this.updateProgress.bind(this)}
                  removeKeyResult={this.props.removeKeyResult}
                  onProgressChange={this.handleProgressChange.bind(this)}
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
  users: PropTypes.object,
  isOpen: PropTypes.bool,
};

OkrFormModal.defaultProps = {
  objective: Map(),
};

export default OkrFormModal;
