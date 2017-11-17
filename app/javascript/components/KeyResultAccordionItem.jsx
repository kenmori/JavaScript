import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Segment, Accordion } from 'semantic-ui-react';
import EditableText from './utils/EditableText';

class KeyResultAccordionItem extends Component {
  constructor(props) {
    super(props);
    this.state = { progressRate: props.keyResult.get('progressRate') };
  }

  handleSliderChange(event) {
    this.setState({ progressRate: event.target.value });
    this.props.onProgressChange(this.props.index, Number(event.target.value));
  }

  handleSliderBlur(event) {
    this.updateKeyResult({ progressRate: Number(event.target.value) });
    this.props.updateProgress(this.props.index, Number(event.target.value));
  }

  updateValues(targetValue, actualValue) {
    if (targetValue && actualValue) {
      const progressRate = Math.round(actualValue / targetValue * 100);

      this.setState({ progressRate: progressRate });
      this.props.onProgressChange(this.props.index, progressRate);
      this.props.updateProgress(this.props.index, progressRate);

      this.updateKeyResult({
        targetValue: targetValue,
        actualValue: actualValue,
        progressRate: progressRate,
      });
    } else {
      this.updateKeyResult({
        targetValue: targetValue,
        actualValue: actualValue,
      });
    }
  }

  updateKeyResult(values) {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }

  render() {
    const keyResult = this.props.keyResult;
    return (
      <Segment>
          <Accordion.Title className='flex flex-between' active={this.props.active} index={this.props.index} onClick={this.props.onClick}>
            <div><Icon name='dropdown'/>{keyResult.get('name')}</div>
            <div className='target-value'>目標：{keyResult.get('targetValue')}{keyResult.get('valueUnit')}</div>
            <div className='expired-date'>期限：{keyResult.get('expiredDate')}</div>
            <div className='progress-rate'>{this.state.progressRate}%</div>
          </Accordion.Title>
          <Accordion.Content active={this.props.active}>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>進捗: <span className='progress-rate'>{this.state.progressRate}%</span></label>
                <div className='slider'>
                  <input type='range' min='0' max='100' value={this.state.progressRate} onChange={this.handleSliderChange.bind(this)} step='1'
                         data-unit='%' onBlur={this.handleSliderBlur.bind(this)}/>
                </div>
              </Form.Field>
              <Form.Field className='values'>
                <div>
                  <label>目標値: </label>
                  <EditableText value={keyResult.get('targetValue') || ''} saveValue={(value) => this.updateValues(value, keyResult.get('actualValue'))}/>
                  <EditableText value={keyResult.get('valueUnit') || ''} saveValue={(value) => this.updateKeyResult({ valueUnit: value })}/>
                </div>
                <div>
                  <label>実績値: </label>
                  <EditableText value={keyResult.get('actualValue') || ''} saveValue={(value) => this.updateValues(keyResult.get('targetValue'), value)}/>
                  {keyResult.get('valueUnit')}
                </div>
                <div>
                  <label>期限: </label>
                  <EditableText value={keyResult.get('expiredDate') || ''} saveValue={(value) => this.updateKeyResult({ expiredDate: value })}/>
                </div>
              </Form.Field>
            </Form.Group>
          </Accordion.Content>
      </Segment>
    );
  }
}

KeyResultAccordionItem.propTypes = {
  keyResult: PropTypes.object,
  updateKeyResult: PropTypes.func
};

KeyResultAccordionItem.defaultProps = {
  keyResult: null,
  updateKeyResult: () => {}
};

export default KeyResultAccordionItem;
