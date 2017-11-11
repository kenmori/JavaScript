import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Segment, Accordion } from 'semantic-ui-react';
import EditableText from './utils/EditableText';

class KeyResultAccordion extends Component {
  constructor(props) {
    super(props);
    this.state = { progressRate: props.keyResult.get('progressRate') };
  }

  handleSliderChange(event) {
    this.setState({ progressRate: event.target.value });
  }

  handleSliderUnFocus(event) {
    this.updateKeyResult({ progressRate: Number(event.target.value) });
  }

  updateKeyResult(values) {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }

  render() {
    const keyResult = this.props.keyResult;
    return (
      <Segment color='red' className='key-result-accordion'>
        <Accordion>
          <Accordion.Title className='flex flex-between'>
            <div><Icon />{keyResult.get('name')}</div>
            <div className='progress-ratio'>{this.state.progressRate}%</div>
          </Accordion.Title>
          <Accordion.Content>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>進捗: <span className='progress-rate'>{this.state.progressRate}%</span></label>
                <div className='slider'>
                  <input type='range' min='0' max='100' value={this.state.progressRate} onChange={this.handleSliderChange.bind(this)} step='1'
                         data-unit='%' onBlur={this.handleSliderUnFocus.bind(this)}/>
                </div>
              </Form.Field>
              <Form.Field className='values'>
                <div>
                  <label>目標数値: </label>
                  <EditableText value={`${keyResult.get('targetValue')}`} saveValue={(value) => this.updateKeyResult({ targetValue: value })}>
                    {keyResult.get('valueUnit')}
                  </EditableText>
                </div>
                <div>実績数値: <span>{keyResult.get('actualValue')}{keyResult.get('valueUnit')}</span></div>
              </Form.Field>
            </Form.Group>
          </Accordion.Content>
        </Accordion>
      </Segment>);
  }
}

KeyResultAccordion.propTypes = {
  keyResult: PropTypes.object,
  updateKeyResult: PropTypes.func
};

KeyResultAccordion.defaultProps = {
  keyResult: null,
  updateKeyResult: () => {}
};

export default KeyResultAccordion;
