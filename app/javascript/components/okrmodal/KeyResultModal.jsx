import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Button, Form, Input, Modal, List, TextArea } from 'semantic-ui-react';
import DatePicker from '../form/DatePicker';
import KeyResultMemberSelect from '../form/KeyResultMemberSelect';
import UserSelect from '../form/UserSelect';
import OkrSelect from '../form/OkrSelect';
import moment from 'moment';
import { fromJS } from 'immutable';

class KeyResultModal extends Component {
  constructor(props) {
    super(props);
    this.defaultExpiredDate = null;
    this.state = {
      expiredDate: -1,
      members: [],
      ownerId: null,
    }
  }

  getDefaultExpiredData(periods) {
    if(this.defaultExpiredDate) { return this.defaultExpiredDate; }
    const selectedPeriodId = this.props.okrPeriodId;
    const selectedPeriod = periods.find((item) => item.get('id') === selectedPeriodId);
    this.defaultExpiredDate = moment(new Date(selectedPeriod.get('monthEnd'))).endOf('month');
    return this.defaultExpiredDate;
  }

  handleCalendar(date) {
    if (date) {
      this.setState({expiredDate: date});
    }
  }

  changeKeyResultOwner(value) {
    this.setState({
      ownerId: value,
    });
    this.removeMember(value);
  }

  addMember(value) {
    const members = this.state.members;
    members.push(value);
    this.setState({ members });
  }

  removeMember(value) {
    const members = this.state.members;
    members.splice(members.indexOf(value), 1);
    this.setState({ members });
  }

  save() {
    const keyResult = {
      name: this.nameInput.inputRef.value,
      description: findDOMNode(this.refs.descriptionArea).value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      targetValue: this.targetInput.inputRef.value,
      valueUnit: this.unitInput.inputRef.value,
      expiredDate: this.state.expiredDate.format(),
      members: this.state.members,
    };
    this.props.addKeyResult(keyResult);
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const isFetchedPeriods = !nextProps.okrPeriods.isEmpty() && this.state.expiredDate === -1;
    if (isFetchedPeriods) {
      const expiredDate = this.getDefaultExpiredData(nextProps.okrPeriods);
      this.setState({
        expiredDate
      });
    }

    if (nextProps.objective && this.props.objective !== nextProps.objective) {
      this.setState({
        ownerId: nextProps.objective.get('owner').get('id'),
      });
    }

    const willClose = nextProps.isOpen !== currentProps.isOpen && !nextProps.isOpen;
    if (willClose) {
      this.setState({
        expiredDate: -1,
        members: [],
      });
    }
  }

  isEditing() {
    return this.nameInput.inputRef.value !== ''
      || findDOMNode(this.refs.descriptionArea).value !== ''
      || this.targetInput.inputRef.value !== ''
      || this.unitInput.inputRef.value !== ''
      || this.state.expiredDate !== this.getDefaultExpiredData(this.props.okrPeriods)
      || this.state.ownerId !== this.props.objective.get('owner').get('id')
      || this.state.members.length;
  }

  handleClose() {
    if(this.isEditing()) {
      this.props.confirm({
        content: '編集中の内容を破棄します。よろしいですか？',
        onConfirm: () => this.closeModal(),
      })
    } else {
      this.closeModal();
    }
  }

  closeModal() {
    this.props.closeModal();
  }
  
  render() {
    const { objective } = this.props;
    const parentKeyResult = objective && objective.get('parentKeyResult');
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='keyresult-modal' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.handleClose.bind(this)}
      >
        <Modal.Header>
          KeyResult を追加する
        </Modal.Header>
        <Modal.Content>
          <div className="keyresult-modal__body">
            <div className="keyresult-modal__sidebar sidebar">
              {parentKeyResult && (
                <div className="sidebar__item">
                  <div className="sidebar__title">上位 Key Result</div>
                  <div className="sidebar__content">
                    <List>
                      <List.Item>
                        <List.Content>
                          <List.Header>{parentKeyResult.get('name')}</List.Header>
                          <List.Description>{parentKeyResult.get('description')}</List.Description>
                        </List.Content>
                      </List.Item>
                    </List>
                  </div>
                </div>
              )}
              <div className="sidebar__item">
                <div className="sidebar__title">紐付く Objective</div>
                <div className="sidebar__content">
                  <List>
                    <List.Item>
                      <List.Content>
                        <List.Header>{objective && objective.get('name')}</List.Header>
                        <List.Description>{objective && objective.get('description')}</List.Description>
                      </List.Content>
                    </List.Item>
                  </List>
                </div>
              </div>
            </div>
            <div className="keyresult-modal__main">
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Key Result</label>
                    <Input ref={node => this.nameInput = node} />
                  </Form.Field>
                </Form.Group>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>説明</label>
                    <TextArea autoHeight rows={3} ref='descriptionArea'
                              placeholder={`Key Result についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <div className="flex-center">
                      <div style={{marginRight: "10px"}}>
                        <label>目標値</label>
                        <div style={{width: "177px"}} >
                          <Input ref={node => this.targetInput = node} />
                        </div>
                      </div>
                      <div>
                        <label>単位</label>
                        <Input placeholder='例：円、件、人' ref={node => this.unitInput = node} />
                      </div>
                    </div>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>期限</label>
                    <DatePicker dateFormat='YYYY/M/D' locale='ja' selected={this.state.expiredDate} onChange={this.handleCalendar.bind(this)} />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>責任者</label>
                    <UserSelect
                      users={this.props.users} 
                      value={this.state.ownerId}
                      onChange={value => this.changeKeyResultOwner(value)}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>関係者</label>
                    <KeyResultMemberSelect
                      users={this.props.users}
                      members={this.state.members}
                      excludedId={this.state.ownerId}
                      add={this.addMember.bind(this)}
                      remove={this.removeMember.bind(this)}
                    />
                  </Form.Field>
                </Form.Group>
                {objective && (
                  <Form.Field>
                    <label>紐付く Objective</label>
                    <OkrSelect
                      okrs={fromJS([objective])}
                      value={objective.get('id')}
                      preview={false}
                      disabled={!!objective}
                      onChange={value => {}}
                    />
                  </Form.Field>
                )}
              </Form>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.handleClose.bind(this)}>キャンセル</Button>
            <Button positive onClick={this.save.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default  KeyResultModal;
