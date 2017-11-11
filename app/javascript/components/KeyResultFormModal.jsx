import React, { Component } from 'react';
import { Button, Form, Input, Modal, Dropdown } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

class KeyResultFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {expiredDate: moment()}
  }

  usersOption(users) {
    return users.map(item => ({
      key: item.get('id'),
      value: item.get('id'),
      text: `${item.get('lastName')} ${item.get('firstName')}`,
    })).toArray();
  }

  handleCalendar(date) {
    this.setState({expiredDate: date})
  }

  add() {
    const keyResult = {
      name: this.nameInput.inputRef.value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.ownerSelect.getSelectedItem().value,
      targetValue: this.targetInput.inputRef.value,
      valueUnit: this.unitInput.inputRef.value,
      expiredDate: this.state.expiredDate.format(),
    };
    this.props.addKeyResult(keyResult);
    this.nameInput.inputRef.value = '';
    this.targetInput.inputRef.value = '';
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const willClose = nextProps.isOpen !== currentProps.isOpen && !nextProps.isOpen;
    if (willClose) {
      this.setState({expiredDate: moment()});
    }
  }

  render() {
    if (this.props.users.isEmpty()) {
      return null;
    }
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          {this.props.objective && this.props.objective.get('name')} の KeyResult を作成する
        </Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Group widths='equal'>
              <Form.Field>
                <label>Key Result 名</label>
                <Input placeholder='Objective の達成に必要な Key Result' ref={node => {this.nameInput = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <div className="flex-center">
                  <div style={{marginRight: "10px"}}>
                    <label>目標値</label>
                    <Input type="number" ref={node => {this.targetInput = node;}}/>
                  </div>
                  <div>
                    <label>単位</label>
                    <Input type="text" ref={node => {this.unitInput = node;}}/>
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
                <Dropdown selection options={this.usersOption(this.props.users)} ref={node => {this.ownerSelect = node;}}/>
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
