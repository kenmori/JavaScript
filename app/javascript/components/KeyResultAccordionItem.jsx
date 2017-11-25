import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Segment, Accordion, Dropdown, Button } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import Avatar from './Avatar';
import EditableText from './utils/EditableText';
import moment from 'moment';

class KeyResultAccordionItem extends Component {
  constructor(props) {
    super(props);
    const concernedPeople = props.keyResult.get('concernedPeople').map(item => item.get('id')).toArray();
    concernedPeople.push(null);
    this.state = {
      sliderValue: props.keyResult.get('progressRate'),
      expiredDate: moment(props.keyResult.get('expiredDate')),
      concernedPeople,
    };
  }

  usersOption(users, isOwner) {
    return users.map(item => {
      const id = isOwner ? item.get('ownerId') : item.get('id');
      return {
        key: id,
        value: id,
        text: `${item.get('lastName')} ${item.get('firstName')}`,
      }
    }).toArray();
  }

  participantList(options, add, remove) {
    const list = this.state.concernedPeople.map((id, idx) => {
      const icon = id !== null && <Icon name="close" className="concerned-people__close" onClick={() => {remove(id)}} />
      return <div key={idx} className="concerned-people__item">
              <Dropdown selection value={id} options={options} onChange={(e, { value }) => {add(value, idx)}}/>
              {icon}
             </div>
    })

    return <div className="concerned-people">{list}</div>;
  }

  addConcernedPeople(value, boxIndex) {
    const concernedPeople = this.state.concernedPeople;

    concernedPeople[boxIndex] = value;
    if (boxIndex === concernedPeople.length - 1) {
      concernedPeople.push(null);
    }

    this.setState({
      concernedPeople: concernedPeople
    });

    this.updateKeyResult({
      concernedPeople: concernedPeople.filter(item => item !== null)
    });
  }

  removeConcernedPeople(clickedId) {
    const concernedPeople = this.state.concernedPeople.filter( id => id !== clickedId)
    this.setState({
      concernedPeople: concernedPeople
    });

    this.updateKeyResult({
      concernedPeople: concernedPeople.filter(item => item !== null)
    });
  }

  handleClick(event, titleProps) {
    this.props.onClick(titleProps.index);
  }

  handleSliderChange(event) {
    this.setState({ sliderValue: event.target.value });
    this.props.onProgressChange(this.props.index, Number(event.target.value));
  }

  handleSliderBlur(event) {
    this.updateKeyResult({ progressRate: Number(event.target.value) });
    this.props.updateProgress(this.props.index, Number(event.target.value));
  }

  updateValues(targetValue, actualValue) {
    if (targetValue && actualValue) {
      const progressRate = Math.round(actualValue / targetValue * 100);

      this.setState({ sliderValue: progressRate });
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

  handleCalendar(value) {
    this.setState({
      expiredDate: value
    });
    this.updateKeyResult({ expiredDate: value.format() });
  }

  render() {
    const keyResult = this.props.keyResult;
    return (
      <Segment>
          <Accordion.Title className='flex flex-between' active={this.props.active} index={this.props.index} onClick={this.handleClick.bind(this)}>
            <Icon name='dropdown'/>
            <Avatar name={keyResult.get('owner').get('lastName')} path={keyResult.get('owner').get('avatarUrl')} />
            <div className="name">{keyResult.get('name')}</div>
            <div className='target-value'>目標：{keyResult.get('targetValue')}{keyResult.get('valueUnit')}</div>
            <div className='expired-date'>期限：{keyResult.get('expiredDate')}</div>
            <div className='progress-rate'>{keyResult.get('progressRate')}%</div>
          </Accordion.Title>
          <Accordion.Content active={this.props.active}>
            <Form.Field className='values'>
              <label>進捗</label>
              <div className='progress-rate'>{this.state.sliderValue}%</div>
              <div className='slider'>
                <input type='range' min='0' max='100' value={this.state.sliderValue} onChange={this.handleSliderChange.bind(this)} step='1'
                       data-unit='%' onBlur={this.handleSliderBlur.bind(this)}/>
              </div>
            </Form.Field>
            <Form.Field className='values'>
              <label>Key Result 名</label>
              <EditableText value={keyResult.get('name')} saveValue={value => this.updateKeyResult({ name: value })}/>
            </Form.Field>
            <Form.Field className='values'>
              <label>目標値</label>
              <EditableText value={keyResult.get('targetValue') || ''} saveValue={(value) => this.updateValues(value, keyResult.get('actualValue'))}/>
              <EditableText value={keyResult.get('valueUnit') || ''} saveValue={(value) => this.updateKeyResult({ valueUnit: value })}/>
            </Form.Field>
            <Form.Field className='values'>
              <label>実績値</label>
              <EditableText value={keyResult.get('actualValue') || ''} saveValue={(value) => this.updateValues(keyResult.get('targetValue'), value)}/>
              {keyResult.get('actualValue') ? keyResult.get('valueUnit') : ''}
            </Form.Field>
            <Form.Field className='values input-date-picker'>
              <label>期限</label>
              <DatePicker likeEditable={true} dateFormat="YYYY/MM/DD" locale="ja" selected={this.state.expiredDate} onChange={this.handleCalendar.bind(this)} />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <label>責任者</label>
                <Dropdown selection value={keyResult.get('owner').get('id')} options={this.usersOption(this.props.users, true)} onChange={(e, { value }) => this.updateKeyResult({ownerId: value})}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>関係者</label>
                {this.participantList(this.usersOption(this.props.users), this.addConcernedPeople.bind(this), this.removeConcernedPeople.bind(this))}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Button content="KeyResultを削除する" onClick={() => this.props.removeKeyResult({id: keyResult.get('id')})} negative />
              </Form.Field>
            </Form.Group>
          </Accordion.Content>
      </Segment>
    );
  }
}

KeyResultAccordionItem.propTypes = {
  users: PropTypes.object,
  keyResult: PropTypes.object,
  updateKeyResult: PropTypes.func
};

KeyResultAccordionItem.defaultProps = {
  users: [],
  keyResult: null,
  updateKeyResult: () => {}
};

export default KeyResultAccordionItem;
