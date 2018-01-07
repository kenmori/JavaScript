import React, { Component } from 'react';
import { Button, Form, Input, Modal, Icon, List } from 'semantic-ui-react';
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
      okrPeriodId: this.props.objective.get('okrPeriodId'),
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
    const objective = this.props.objective;

    return (
      <Modal open={this.props.isOpen} className="keyresult-form-modal" size="large">
        <Modal.Header>
          KeyResult を追加する
        </Modal.Header>
        <Modal.Content>
          <div className="keyresult-form-modal__body">
            <div className="keyresult-form-modal__sidebar sidebar">
              <div className="sidebar__item">
                <div className="sidebar__title">紐付ける Objective</div>
                <div className="sidebar__content">
                  <List>
                    <List.Item>
                      <List.Content>
                        <List.Header>{objective.get('name')}</List.Header>
                        <List.Description>{objective.get('description')}</List.Description>
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
                      users={this.props.users}
                      keyResultMembers={this.state.keyResultMembers}
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
            <Button onClick={this.props.closeModal}>キャンセル</Button>
            <Button positive onClick={this.add.bind(this)}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default KeyResultFormModal;
