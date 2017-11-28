import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Input, Form, Icon, Segment, Accordion, Dropdown, Button, TextArea } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import Avatar from './Avatar';
import EditableText from './utils/EditableText';
import EditableMultiLineText from './utils/EditableMultiLineText';
import br from '../utils/br';
import moment from 'moment';

class KeyResultAccordionItem extends Component {
  constructor(props) {
    super(props);
    const concernedPeople = props.keyResult.get('concernedPeople').map(item => item.get('id')).toArray();
    concernedPeople.push(null);
    this.state = {
      isDisplayedTargetValue: !!props.keyResult.get('targetValue'),
      sliderValue: props.keyResult.get('progressRate'),
      expiredDate: moment(props.keyResult.get('expiredDate')),
      isDisplayedRateInputForm: false,
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

  concernedPeopleTag(options, add, remove) {
    const list = this.state.concernedPeople.map((id, idx) => {
      const icon = id !== null && <Icon name="close" className="concerned-people__close" onClick={() => {remove(id)}} />
      return (
        <div key={idx} className="concerned-people__item">
          <Dropdown selection value={id} options={options} onChange={(e, { value }) => {add(value)}}/>
          {icon}
        </div>
      )
    })
    return <div className="concerned-people">{list}</div>;
  }

  addConcernedPeople(value) {
    this.updateKeyResult({
      concernedPerson: {data: value, behavior: 'add'}
    });
  }

  removeConcernedPeople(value) {
    this.updateKeyResult({
      concernedPerson: {data: value, behavior: 'remove'}
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

  removeKeyResult(id) {
    if(confirm('KeyResultを削除します')) {
      this.props.removeKeyResult({id})
    }
  }

  handleCalendar(value) {
    this.setState({
      expiredDate: value
    });
    this.updateKeyResult({ expiredDate: value.format() });
  }

  handleRateViewClick() {
    this.setState({
      isDisplayedRateInputForm: true,
    });
    
    setTimeout(() => {
      findDOMNode(this.refs.progressRateView).focus();
    }, 0)
  }

  handleRateInputBlur(event) {
    this.handleSliderBlur(event)
    this.setState({
      isDisplayedRateInputForm: false,
    });
  }

  commentList(comments) {
    const commentTags = comments.map((item, idx) => {
      return (
        <div className="comments" key={idx}>
          <div className="comments__item">
            {item.get('selfComment') ? (
                <EditableMultiLineText className="comments__item-text" value={item.get('text')} saveValue={(text) => this.updateComment(item.get('id'), text)}/>
              ) : (
                <div className="comments__item-text is-others">{ br(item.get('text'))}</div>
              )

            }
            <div className="comments__item-meta">
              <div className="comments__item-updated">{moment(item.get('updatedAt')).format('YYYY/MM/DD HH:mm')}</div>
              <div className="comments__item-name">{item.get('fullName')}</div>
            </div>
          </div>
          {item.get('selfComment') && <Icon name="close" className="comments__item-icon" onClick={() => {this.removeComment(item.get('id'))}} />}
        </div>
      )
    });
    return <div>{commentTags}</div>;
  }

  addComment() {
    const value = findDOMNode(this.refs.commentArea).value;
    if (!value) {
      return;
    }
    this.updateKeyResult({
      comment: {data: value, behavior: 'add'}
    });
    findDOMNode(this.refs.commentArea).value = '';
  }

  updateComment(id, text) {
    if (!text) {
      return;
    }
    this.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    });
  }

  removeComment(id) {
    this.updateKeyResult({
      comment: {data: id, behavior: 'remove'}
    });
  }

  componentWillReceiveProps(nextProps) {
    const concernedPeople = nextProps.keyResult.get('concernedPeople').map(item => item.get('id')).toArray();
    concernedPeople.push(null);
    this.setState({
      concernedPeople
    });
  }

  render() {
    const keyResult = this.props.keyResult;
    return (
      <Segment>
          <Accordion.Title className='flex flex-between' active={this.props.active} index={this.props.index} onClick={this.handleClick.bind(this)}>
            <Icon name='dropdown'/>
            <Avatar user={keyResult.get('owner')} />
            <div className="name">{keyResult.get('name')}</div>
            {keyResult.get('targetValue') && 
              <div className='target-value'>目標：{keyResult.get('targetValue')}{keyResult.get('valueUnit')}</div>
            }
            <div className='expired-date'>期限：{keyResult.get('expiredDate')}</div>
            <div className='progress-rate'>{keyResult.get('progressRate')}%</div>
          </Accordion.Title>
          <Accordion.Content active={this.props.active}>
            <Form.Field className='values'>
              <label className="field-title">進捗</label>
              {this.state.isDisplayedRateInputForm && 
                <div className="progress-rate-input">
                  <div className="progress-rate-input__inner">
                    <Input type="number" 
                          defaultValue={this.state.sliderValue} 
                          onBlur={this.handleRateInputBlur.bind(this)} 
                          onChange={this.handleSliderChange.bind(this)} 
                          max="100"
                          min="0"
                          ref="progressRateView"
                    /> %
                  </div>
                </div>
              }
              {!this.state.isDisplayedRateInputForm && 
                <span>
                  <div className='progress-rate is-slider-screen' onClick={this.handleRateViewClick.bind(this)}>{this.state.sliderValue}%</div>
                  <div className='slider'>
                    <input type='range' min='0' max='100' value={this.state.sliderValue} onChange={this.handleSliderChange.bind(this)} step='1'
                          data-unit='%' onBlur={this.handleSliderBlur.bind(this)}/>
                  </div>
                </span>
              }
            </Form.Field>
            <Form.Field className='values'>
              <label className="field-title">Key Result 名</label>
              <EditableText value={keyResult.get('name')} saveValue={value => this.updateKeyResult({ name: value })}/>
            </Form.Field>
            {this.state.isDisplayedTargetValue && 
              <div>
                <Form.Field className='values'>
                  <label className="field-title">目標値</label>
                  <EditableText placeholder="目標値" value={keyResult.get('targetValue') || ''} saveValue={(value) => this.updateValues(value, keyResult.get('actualValue'))}/>
                  <EditableText placeholder="単位" value={keyResult.get('valueUnit') || ''} saveValue={(value) => this.updateKeyResult({ valueUnit: value })}/>
                </Form.Field>
                <Form.Field className='values'>
                  <label className="field-title">実績値</label>
                  <EditableText placeholder="実績値"　value={keyResult.get('actualValue') || ''} saveValue={(value) => this.updateValues(keyResult.get('targetValue'), value)}/>
                  {keyResult.get('actualValue') ? keyResult.get('valueUnit') : ''}
                </Form.Field>
              </div>
            }
            {!this.state.isDisplayedTargetValue && 
              <Form.Group>
                <Form.Field>
                  <Button content="目標値を設定する" onClick={() => this.setState({isDisplayedTargetValue: true})} positive />
                </Form.Field>
              </Form.Group>
            }
            <Form.Field className='values input-date-picker'>
              <label className="field-title">期限</label>
              <DatePicker likeEditable={true} dateFormat="YYYY/MM/DD" locale="ja" selected={this.state.expiredDate} onChange={this.handleCalendar.bind(this)} />
            </Form.Field>
            <Form.Group>
              <Form.Field>
                <label className="field-title">責任者</label>
                <Dropdown selection value={keyResult.get('owner').get('id')} options={this.usersOption(this.props.users, true)} onChange={(e, { value }) => this.updateKeyResult({ownerId: value})}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label className="field-title">関係者</label>
                {this.concernedPeopleTag(this.usersOption(this.props.users), this.addConcernedPeople.bind(this), this.removeConcernedPeople.bind(this))}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="wide-field">
                <label className="field-title">コメント</label>
                {this.commentList(keyResult.get('comments'))}
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="wide-field">
                <TextArea autoHeight defaultValue="" style={{ minHeight: 80 }} ref="commentArea" />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <Button content="コメントを投稿する" onClick={() => this.addComment()} as="div" />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field className="delete-button">
                <Button content="KeyResultを削除する" onClick={() => {this.removeKeyResult(keyResult.get('id'))}} as="span" negative />
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
