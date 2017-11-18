import React, { Component } from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Button, Form, Icon, Modal, Segment } from 'semantic-ui-react';
import KeyResultAccordion from './KeyResultAccordion';
import EditableText from './utils/EditableText';
import EditableMultiLineText from './utils/EditableMultiLineText'

class ObjectiveDetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = { sliderValue: 0 };
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
    return (
      <Modal open={this.props.isOpen} size='small' className='objective_detail_modal'>
        <Modal.Header>
          <h1><EditableText value={objective.get('name')} saveValue={(value) => this.updateObjective({ name: value })}/></h1>
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>進捗: <span className='progress-rate'>{this.state.sliderValue}%</span></label>
                <div className='slider'>
                  <input type='range' min='0' max='100' value={this.state.sliderValue}
                         step='1' data-unit='%' readOnly/>
                </div>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Objective の説明</label>
                <EditableMultiLineText value={objective.get('description')} saveValue={(value) => this.updateObjective({ description: value })}/>
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Key Result 一覧 ({objective.get('keyResults') && objective.get('keyResults').size})</label>
                {(() => {
                  if(objective.get('keyResults')) {
                    return <KeyResultAccordion keyResults={objective.get('keyResults')}
                                               updateKeyResult={this.props.updateKeyResult}
                                               updateProgress={this.updateProgress.bind(this)}
                                               onProgressChange={this.handleProgressChange.bind(this)}/>
                  }
                })()}
              </Form.Field>
            </Form.Group>
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
