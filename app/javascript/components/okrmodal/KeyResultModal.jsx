import React, { Component } from 'react';
import { Button, Form, Modal, List } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import KeyResultMemberSelect from '../form/KeyResultMemberSelect';
import UserSelect from '../form/UserSelect';
import RenderField from '../form/RenderField';
import RenderDateField from '../form/RenderDateField';
import moment from 'moment';

class KeyResultModal extends Component {
  constructor(props) {
    super(props);
    this.defaultExpiredDate = null;
    this.state = {
      expiredDate: -1,
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
    this.setState({expiredDate: date});
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

  add(validData) {
    const keyResult = {
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      keyResultMembers: this.state.keyResultMembers
    };
    this.props.addKeyResult(Object.assign(keyResult, validData));
  }

  componentWillReceiveProps(nextProps, currentProps) {
    const isFetchedPeriods = !nextProps.okrPeriods.isEmpty() && this.state.expiredDate === -1;
    if (isFetchedPeriods) {
      const expiredDate = this.getDefaultExpiredData(nextProps.okrPeriods);
      this.setState({
        expiredDate
      });
      this.props.initialize({
        expiredDate: expiredDate.format("YYYY/M/D")
      });
    }

    if (nextProps.objective && this.props.objective !== nextProps.objective) {
      this.setState({
        ownerId: nextProps.objective.get('owner').get('id'),
      });
    }

    const willClose = nextProps.isOpen !== currentProps.isOpen && !nextProps.isOpen;
    if (willClose) {
      this.props.initialize({
        name: "",
        targetValue: "",
        valueUnit: "",
      });
      this.setState({
        expiredDate: -1,
        keyResultMembers: []
      });
    }
  }

  isEditing() {
    return this.state.ownerId !== this.props.objective.get('owner').get('id')
      || this.state.keyResultMembers.length;
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
    const { handleSubmit, objective } = this.props;
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
                    <Field 
                      name="name" 
                      type="text"
                      component={RenderField} 
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <div className="flex-center">
                      <div style={{marginRight: "10px"}}>
                        <label>目標値</label>
                        <div style={{width: "177px"}} >
                          <Field 
                            name="targetValue" 
                            type="text"
                            component={RenderField} 
                          />
                        </div>
                      </div>
                      <div>
                        <label>単位</label>
                        <Field 
                          name="valueUnit" 
                          type="text"
                          placeholder="例：円、件、人"
                          component={RenderField} 
                        />
                      </div>
                    </div>
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>期限</label>
                    <Field 
                      name="expiredDate" 
                      type="text"
                      dateFormat="YYYY/M/D" 
                      locale="ja" 
                      selected={this.state.expiredDate} 
                      handleCalendar={this.handleCalendar.bind(this)}
                      component={RenderDateField} 
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>責任者</label>
                    <UserSelect
                      users={this.props.users} 
                      defaultValue={this.state.ownerId}
                      onChange={value => this.changeKeyResultOwner(value)}
                    />
                  </Form.Field>
                </Form.Group>
                <Form.Group>
                  <Form.Field>
                    <label>関係者</label>
                    <KeyResultMemberSelect
                      users={this.props.users}
                      keyResultMembers={this.state.keyResultMembers}
                      excludedId={this.state.ownerId}
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
            <Button positive onClick={handleSubmit(data => {
              this.add(data)
            })}>保存</Button>
          </div>
        </Modal.Actions>
      </Modal>
    );
  }
}

export default reduxForm({
  form: 'keyResultModal',
  validate: (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Key Result を入力してください'
    }
    if (values.valueUnit && !values.targetValue) {
      errors.targetValue = "目標値を入力してください";
    }
    if (values.targetValue) {
      if (!/^[０-９0-9\.．]+$/.test(values.targetValue)) {
        errors.targetValue = "目標値は数値を入力してください";
      } else if(values.targetValue < 0) {
        errors.targetValue = "目標値は0以上の数値を入力してください";
      }
    }
    if (!moment(values.expiredDate, "YYYY/M/D", true).isValid()) {
      errors.expiredDate = '期限が不正です';
    }
    return errors
  },
  shouldError: () => true,
})(KeyResultModal)
