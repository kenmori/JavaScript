import React, { Component } from 'react';
import { Button, Form, Input, Modal, Icon } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import KeyResultMemberSelectBox from './KeyResultMemberSelectBox';
import UserSelectBox from './UserSelectBox';
import moment from 'moment';

class KeyResultFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiredDate: null,
      keyResultMembers: []
    }
  }

  getDefaultExpiredData(periods) {
    const selectedPeriodId = this.props.menu.get('okrPeriodId');
    const selectedPeriod = periods.find((item) => item.get('id') === selectedPeriodId);
    return moment(new Date(selectedPeriod.get('monthEnd'))).endOf('month');
  }

  handleCalendar(date) {
    this.setState({expiredDate: date})
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
      ownerId: this.ownerSelect.selectedValue,
      targetValue: this.targetInput.inputRef.value,
      valueUnit: this.unitInput.inputRef.value,
      expiredDate: this.state.expiredDate.format(),
      keyResultMembers: this.state.keyResultMembers
    };
    this.props.addKeyResult(keyResult);
    this.nameInput.inputRef.value = '';
    this.targetInput.inputRef.value = '';
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const isFetchedPeriods = !nextProps.okrPeriods.isEmpty() && this.state.expiredDate === null;
    if (isFetchedPeriods) {
      this.setState({
        expiredDate: this.getDefaultExpiredData(nextProps.okrPeriods),
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

  
  render() {
    if (this.props.users.isEmpty() || this.props.objective.isEmpty()) {
      return null;
    }
    return (
      <Modal open={this.props.isOpen} className="key-result-form-modal" size="small">
        <Modal.Header>
          KeyResult を追加する
        </Modal.Header>
        <Modal.Content>
          <Form>
          <Form.Group widths='equal'>
              <Form.Field>
                <label>紐付ける Objective</label>
                <Input value={this.props.objective.get('name')} readOnly />
              </Form.Field>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Key Result 名</label>
                <Input placeholder='Objective 達成のカギとなる成果を入力してください' ref={node => {this.nameInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <div className="flex-center">
                  <div style={{marginRight: "10px"}}>
                    <label>目標値</label>
                    <Input type="number" placeholder='目標値を入力してください' ref={node => {this.targetInput = node;}}/>
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
                  defaultValue={this.props.objective.get('ownerId')} 
                  isOwner={true}
                  ref={node => {this.ownerSelect = node;}}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>関係者</label>
                <KeyResultMemberSelectBox 
                  users={this.props.users.filter(item => item.get('ownerId') !== this.props.objective.get('ownerId') )}
                  keyResultMembers={this.state.keyResultMembers}
                  add={this.addKeyResultMembers.bind(this)}
                  remove={this.removeKeyResultMembers.bind(this)}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.props.closeModal}>キャンセル</Button>
            <Button positive onClick={this.add.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default KeyResultFormModal;
