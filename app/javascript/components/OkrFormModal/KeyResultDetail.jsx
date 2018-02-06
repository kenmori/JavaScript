import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Input, Form, Icon, Popup, Button, TextArea, List, Divider } from 'semantic-ui-react';
import DatePicker from '../DatePicker';
import EditableText from '../utils/EditableText';
import EditableMultiLineText from '../utils/EditableMultiLineText';
import UserSelectBox from '../UserSelectBox';
import KeyResultMemberSelectBox from '../KeyResultMemberSelectBox';
import Avatar from '../Avatar';
import br from '../../utils/br';
import moment from 'moment';

class KeyResultDetail extends Component {

  constructor(props) {
    super(props);
    this.state = this.getState(props);
  }

  getState(props) {
    return {
      name: props.keyResult.get('name'),
      targetValue: props.keyResult.get('targetValue') || '',
      actualValue: props.keyResult.get('actualValue') || '',
      valueUnit: props.keyResult.get('valueUnit') || '',
      progressRate: props.keyResult.get('progressRate'),
      expiredDate: props.keyResult.get('expiredDate'),
      isTargetValueVisible: !!props.keyResult.get('targetValue'),
    };
  }

  addKeyResultMembers(value) {
    this.updateKeyResult({
      keyResultMember: {user: value, behavior: 'add', role: 'member'}
    });
  }

  removeKeyResultMembers(value) {
    const removeAction = () => this.updateKeyResult({
      keyResultMember: { user: value, behavior: 'remove' }
    });
    if (this.props.keyResult.get('childObjectives').some(objective => objective.get('owner').get('id') === value)) {
      this.props.confirm({
        content: '下位 Objective が紐付いています。関係者を削除しますか？',
        onConfirm: removeAction,
      });
    } else {
      removeAction();
    }
  }

  changeKeyResultOwner(value) {
    this.updateKeyResult({
      keyResultMember: {user: value, behavior: 'add', role: 'owner'}
    });
  }

  updateKeyResult(values) {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }
  
  updateKeyResultWithState(name, value) {
    if (this.state[name] !== value) {
      this.setState({ [name]: value });
      this.updateKeyResult({ [name]: value });
    }
  }

  removeKeyResult(id) {
    this.props.confirm({
      content: this.props.keyResult.get('childObjectives').isEmpty()
        ? 'Key Result を削除しますか？' : '下位 Objective が紐付いています。Key Result を削除しますか？',
      onConfirm: () => this.props.removeKeyResult({ id }),
    });
  }

  commentList(comments) {
    const commentTags = comments.map((item) => {
      return (
        <div className="comments" key={item.get('id')}>
          <div className="comments__item">
            {item.get('editable') ? (
                <EditableMultiLineText className="comments__item-text" value={item.get('text')} saveValue={(text) => this.editComment(item.get('id'), text)}/>
              ) : (
                <div className="comments__item-text is-others">{ br(item.get('text'))}</div>
              )

            }
            <div className="comments__item-meta">
              <div className="comments__item-updated">{moment(item.get('updatedAt')).format('YYYY/MM/DD HH:mm')}</div>
              <div className="comments__item-name">{item.get('fullName')}</div>
              {item.get('editable') && <Icon link name="trash" className="comments__item-icon" onClick={() => {this.removeComment(item.get('id'))}} />}
            </div>
          </div>
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

  editComment(id, text) {
    if (!text) {
      return;
    }
    this.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    });
  }

  removeComment(id) {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () => {
        this.updateKeyResult({
          comment: { data: id, behavior: 'remove' }
        });
      },
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyResult.get('id') !== nextProps.keyResult.get('id')) {
      this.setState(this.getState(nextProps));
    } else if (this.props.keyResult.get('progressRate') !== nextProps.keyResult.get('progressRate')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
      });
    }
  }

  childObjectivesTag(childObjectives) {
    if (childObjectives.isEmpty()) return null;
    return (
      <Form.Field>
        <label>下位 Objective 一覧</label>
        <List className='child-objectives-list'>
          {childObjectives.map(objective =>
            <List.Item key={objective.get('id')}>
              <Avatar user={objective.get('owner')} size='small' />
              <List.Content>{objective.get('name')}</List.Content>
            </List.Item>
          )}
        </List>
      </Form.Field>
    );
  }

  render() {
    const keyResult = this.props.keyResult;
    if (!keyResult) {
      return null;
    }
    const keyResultMembers = keyResult.get('keyResultMembers').map(member => member.get('id')).toArray();
    const isPowerUser = this.props.loginUser.get('isAdmin')
      || this.props.loginUser.get('id') === keyResult.get('owner').get('id')
      || this.props.loginUser.get('id') === this.props.objective.get('owner').get('id');
    return (
      <Form>
        <Form.Field>
          <label>Key Result</label>
          <EditableText value={this.state.name}
                        saveValue={value => this.updateKeyResultWithState('name', value)}
          />
        </Form.Field>

        {this.state.isTargetValueVisible &&
          <Form.Field className='flex-field'>
            <label>目標値</label>
            <div className='flex-field__item'>
              <EditableText value={this.state.targetValue}
                            saveValue={value => this.updateKeyResultWithState('targetValue', value)}
              />
            </div>
            <div className='flex-field__item'>
              <EditableText placeholder="単位"
                            value={this.state.valueUnit}
                            saveValue={value => this.updateKeyResultWithState('valueUnit', value)}
              />
            </div>
          </Form.Field>
        }
        {this.state.isTargetValueVisible &&
          <Form.Field className='flex-field'>
            <label>実績値</label>
            <div className='flex-field__item'>
              <EditableText value={this.state.actualValue}
                            saveValue={value => this.updateKeyResultWithState('actualValue', value)}
              />
            </div>
            <div className='flex-field__item'>
              {this.state.valueUnit}
            </div>
          </Form.Field>
        }
        {!this.state.isTargetValueVisible &&
          <div>
            <Button content="目標値を設定する" onClick={() => this.setState({isTargetValueVisible: true})} floated='right' />
          </div>
        }

        <Form.Field className='flex-field progress-rate-field'>
          <label>進捗</label>
          <div className="flex-field__item progress-rate">
            <div className='progress-rate__input'>
              <Input type="number" min="0" max="100"
                     value={this.state.progressRate}
                     onChange={(event, { value }) => this.setState({ progressRate: value })}
                     onBlur={event => this.updateKeyResultWithState('progressRate', Number(event.target.value))}
              />
            </div>
          </div>
          <div className='flex-field__item progress-rate'>
            %
          </div>
          <div className='flex-field__item slider'>
            <Input type='range' min='0' max='100' step='1'
                   value={this.state.progressRate}
                   onChange={(event, { value }) => this.setState({ progressRate: value })}
                   onMouseUp={event => this.updateKeyResultWithState('progressRate', Number(event.target.value))}
            />
          </div>
          <div className='flex-field__item'>
            {keyResult.get('isProgressRateLinked')
              ? <Popup trigger={<Icon name='linkify' />} content='下位 Objective の進捗率とリンクしています' />
              : <Popup trigger={<Icon name='unlinkify' />} content='下位 Objective の進捗率とはリンクしていません' />
            }
          </div>
        </Form.Field>

        <Form.Field className='flex-field input-date-picker'>
          <label>期限</label>
          <div className='flex-field__item'>
            <DatePicker dateFormat="YYYY/M/D" locale="ja"
                        selected={moment(this.state.expiredDate)}
                        onChange={value => this.updateKeyResultWithState('expiredDate', value.format('YYYY-MM-DD'))}
            />
          </div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>責任者</label>
          <div className='flex-field__item'>
            <UserSelectBox
              users={this.props.users}
              defaultValue={keyResult.get('owner').get('id')}
              onChange={(value) => this.changeKeyResultOwner(value)}
            />
          </div>
        </Form.Field>
        <Form.Field className='flex-field'>
          <label>関係者</label>
          <div className='flex-field__item key-result-members'>
            <KeyResultMemberSelectBox
              users={this.props.users}
              keyResultMembers={keyResultMembers}
              includedId={isPowerUser ? null : this.props.loginUser.get('id')}
              excludedId={keyResult.get('owner').get('id')}
              add={this.addKeyResultMembers.bind(this)}
              remove={this.removeKeyResultMembers.bind(this)}
            />
          </div>
        </Form.Field>

        <Divider hidden />

        <div>
          <Button content="削除する" onClick={() => {this.removeKeyResult(keyResult.get('id'))}} as="span" negative floated='right' />
          <Button content="下位 OKR を作成する" onClick={() => {this.props.changeToObjectiveModal(keyResult)}} as="span" positive floated='right' />
        </div>

        <Divider hidden clearing />

        {this.childObjectivesTag(keyResult.get('childObjectives'))}

        <Divider hidden />

        <Form.Field className="wide-field">
          <label>コメント</label>
          <div className="comments__text-box">
            <TextArea autoHeight defaultValue="" style={{ minHeight: 80 }} placeholder='進捗状況や、次のアクションなどをメモしてください' ref="commentArea" />
          </div>
          <div>
            <Button content="投稿する" onClick={() => this.addComment()} as="div" floated='right' />
          </div>
          <Divider hidden clearing />
          {this.commentList(keyResult.get('comments'))}
        </Form.Field>
      </Form>
    );
  }
}

KeyResultDetail.propTypes = {
  users: PropTypes.object,
  keyResult: PropTypes.object,
  updateKeyResult: PropTypes.func,
  removeKeyResult: PropTypes.func,
  changeToObjectiveModal: PropTypes.func,
};

export default KeyResultDetail;
