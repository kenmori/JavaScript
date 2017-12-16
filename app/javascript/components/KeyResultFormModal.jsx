import React, { Component } from 'react';
import { Button, Form, Input, Modal, Dropdown, Icon } from 'semantic-ui-react';
import DatePicker from './DatePicker';
import moment from 'moment';

class KeyResultFormModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      expiredDate: null,
      concernedPeople: [null]
    }
  }

  getDefaultExpiredData(periods) {
    const selectedPeriodId = this.props.menu.get('okrPeriodId');
    const selectedPeriod = periods.find((item) => item.get('id') === selectedPeriodId);
    return moment(new Date(selectedPeriod.get('monthEnd'))).endOf('month');
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

  handleCalendar(date) {
    this.setState({expiredDate: date})
  }

  addConcernedPeople(value, boxIndex) {
    const concernedPeople = this.state.concernedPeople;

    concernedPeople[boxIndex] = value;
    if (boxIndex === concernedPeople.length - 1) {
      concernedPeople.push(null);
    }

    this.setState({
      concernedPeople: concernedPeople
    })
  }

  removeConcernedPeople(clickedId) {
    this.setState({
      concernedPeople: this.state.concernedPeople.filter( id => id !== clickedId)
    })
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

  add() {
    const keyResult = {
      name: this.nameInput.inputRef.value,
      objectiveId: this.props.objective.get('id'),
      ownerId: this.ownerSelect.getSelectedItem().value,
      targetValue: this.targetInput.inputRef.value,
      valueUnit: this.unitInput.inputRef.value,
      expiredDate: this.state.expiredDate.format(),
      concernedPeople: this.state.concernedPeople.filter(item => item !== null)
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
        concernedPeople: [null]
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
                <Dropdown selection defaultValue={this.props.objective.get('ownerId')} options={this.usersOption(this.props.users, true)} ref={node => {this.ownerSelect = node;}}/>
              </Form.Field>
            </Form.Group>
            <Form.Group>
              <Form.Field>
                <label>関係者</label>
                {this.participantList(this.usersOption(this.props.users), this.addConcernedPeople.bind(this), this.removeConcernedPeople.bind(this))}
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
