import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal, Segment, Dropdown } from 'semantic-ui-react';
import KeyResultAccordion from './KeyResultAccordion';
import Avatar from './Avatar';
import EditableText from './utils/EditableText';
import EditableMultiLineText from './utils/EditableMultiLineText'

class ObjectiveDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = { sliderValue: 0 };
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

  render() {
    const objective = this.props.objective;
    if (!objective.size) { return null; }
    return (
      <Modal open={this.props.isOpen} size='small' className='objective_detail_modal'>
        <Modal.Header>
          <h1><Avatar name={objective.get('owner').get('lastName')} path={objective.get('owner').get('avatarUrl')} /><EditableText value={objective.get('name')} saveValue={(value) => this.updateObjective({ name: value })}/></h1>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field className='values'>
              <label>進捗</label>
              <div className='progress-rate'>{this.state.sliderValue}%</div>
              <div className='slider'>
                <input type='range' min='0' max='100' value={this.state.sliderValue}
                       step='1' data-unit='%' readOnly/>
              </div>
            </Form.Field>
            <Form.Field>
              <label>責任者</label>
              <Dropdown selection options={this.getUsersOption(this.props.users)}
                          value={objective.get('ownerId')} onChange={(e, {value}) => this.updateObjective({ownerId: value})}/>
            </Form.Field>
            <Form.Field>
              <label>Objective の説明</label>
              <EditableMultiLineText value={objective.get('description')} saveValue={(value) => this.updateObjective({ description: value })}/>
            </Form.Field>
            <Form.Field>
              <label>Key Result 一覧 ({objective.get('keyResults') && objective.get('keyResults').size})</label>
              {(() => {
                if(objective.get('keyResults')) {
                  return <KeyResultAccordion users={this.props.users}
                                             keyResults={objective.get('keyResults')}
                                             updateKeyResult={this.props.updateKeyResult}
                                             updateProgress={this.updateProgress.bind(this)}
                                             onProgressChange={this.handleProgressChange.bind(this)}/>
                }
              })()}
            </Form.Field>
          </Form>
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

ObjectiveDetailModal.propTypes = {
  updateObjective: PropTypes.func.isRequired,
  objective: PropTypes.object,
  open: PropTypes.bool,
};

ObjectiveDetailModal.defaultProps = {
  objective: Map(),
};

export default ObjectiveDetailModal;
