import React, { Component } from 'react';
import { Button, Form, Input, Modal, Icon, List } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import KeyResultMemberSelectBox from './KeyResultMemberSelectBox';
import UserSelectBox from './UserSelectBox';
import moment from 'moment';

class KeyResultFormModal extends Component {
  constructor(props) {
    super(props);
    this.defaultExpiredDate = null;
    this.state = {
      expiredDate: null,
      keyResultMembers: [],
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
    this.setState({expiredDate: date})
  }

  changeKeyResultOwner(value) {
    this.setState({
      ownerId: value,
    });
    this.removeKeyResultMembers(value);
  }

  addKeyResultMembers(value) {
    const keyResultMembers = this.state.keyResultMembers;
    keyResultMembers.push(value);
    this.setState({
      keyResultMembers: keyResultMembers
    })
  }

  removeKeyResultMembers(clickedId) {
    this.setState({
      keyResultMembers: this.state.keyResultMembers.filter( id => id !== clickedId)
    })
  }

  add() {
    const keyResult = {
      name: this.nameInput.inputRef.value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      targetValue: this.targetInput.inputRef.value,
      valueUnit: this.unitInput.inputRef.value,
      expiredDate: this.state.expiredDate.format(),
      keyResultMembers: this.state.keyResultMembers
    };
    this.props.addKeyResult(keyResult);
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const isFetchedPeriods = !nextProps.okrPeriods.isEmpty() && this.state.expiredDate === null;
    if (isFetchedPeriods) {
      this.setState({
        expiredDate: this.getDefaultExpiredData(nextProps.okrPeriods),
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
        expiredDate: null,
        keyResultMembers: []
      });
    }
  }

  isEditing() {
    if (
      this.nameInput.inputRef.value !== '' ||
      this.targetInput.inputRef.value !== '' ||
      this.unitInput.inputRef.value !== '' ||
      this.state.expiredDate !== this.getDefaultExpiredData(this.props.okrPeriods) ||
      this.state.ownerId !== this.props.objective.get('owner').get('id') ||
      this.state.keyResultMembers.length
    ) {
      return true;
    }

    return false;
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
    this.nameInput.inputRef.value = '';
    this.targetInput.inputRef.value = '';
    this.props.closeModal();
  }
  
  render() {
    const objective = this.props.objective;
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='large' 
        className='keyresult-form-modal' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={this.handleClose.bind(this)}
      >
        <Modal.Header>
          KeyResult を追加する
        </Modal.Header>
        <Modal.Content>
          <div className="keyresult-form-modal__body">
            <div className="keyresult-form-modal__sidebar sidebar">
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
            <div className="keyresult-form-modal__main">
              <Form>
                <Form.Group widths='equal'>
                  <Form.Field>
                    <label>Key Result</label>
                    <Input placeholder='Key Result を入力してください' ref={node => {this.nameInput = node;}}/>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <div className="flex-center">
                      <div style={{marginRight: "10px"}}>
                        <label>目標値</label>
                        <Input type="text" placeholder='目標値を入力してください' ref={node => {this.targetInput = node;}}/>
                      </div>
                      <div>
                        <label>単位</label>
                        <Input type="text" placeholder='例：円、件、人' ref={node => {this.unitInput = node;}}/>
                      </div>
                    </div>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>期限</label>
                    <DatePicker dateFormat="YYYY/MM/DD" locale="ja" selected={this.state.expiredDate} onChange={this.handleCalendar.bind(this)} />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>責任者</label>
                    <UserSelectBox
                      users={this.props.users} 
                      defaultValue={objective && objective.get('owner') && objective.get('owner').get('id')}
                      onChange={value => this.changeKeyResultOwner(value)}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>関係者</label>
                    <KeyResultMemberSelectBox 
                      users={this.props.users}
                      keyResultMembers={this.state.keyResultMembers}
                      ownerId={this.state.ownerId}
                      add={this.addKeyResultMembers.bind(this)}
                      remove={this.removeKeyResultMembers.bind(this)}
                    />
                  </Form.Field>
                </Form.Group>
              </Form>
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.handleClose.bind(this)}>キャンセル</Button>
            <Button positive onClick={this.add.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default KeyResultFormModal;
