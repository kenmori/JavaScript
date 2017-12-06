import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal, Segment, Dropdown } from 'semantic-ui-react';
import Sidebar from './Sidebar'

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

  handleProgressChange(progressRate) {
    this.setState({ sliderValue: progressRate });
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
    if (!objective.size) { return null; }
    return (
      <Modal open={this.props.isOpen} size='mini' className='okr-form-modal'>
        <Modal.Content>
          {<Sidebar objective={objective} showDetail={this.showDetail.bind(this)} selectedOkr={this.state.selectedOkr} />}
          <div className="okr-main">
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
  updateObjective: PropTypes.func.isRequired,
  objective: PropTypes.object,
  open: PropTypes.bool,
};

OkrFormModal.defaultProps = {
  objective: Map(),
};

export default OkrFormModal;
