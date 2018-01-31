import React, { Component } from 'react';
import { Button, Form, Input, Modal, Icon, List } from 'semantic-ui-react';
import { Field, reduxForm } from 'redux-form';
import KeyResultMemberSelectBox from './KeyResultMemberSelectBox';
import UserSelectBox from './UserSelectBox';
import RenderField from './RenderField';
import RenderDateField from './RenderDateField';
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

  add(validData) {
    const keyResult = {
      objectiveId: this.props.objective.get('id'),
      ownerId: this.state.ownerId,
      expiredDate: this.state.expiredDate.format(),
      keyResultMembers: this.state.keyResultMembers
    };
    this.props.addKeyResult(Object.assign(keyResult, validData));
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
      this.props.initialize({
        name: "",
        targetValue: "",
        valueUnit: "",
      });
      this.setState({
        expiredDate: null,
        keyResultMembers: []
      });
    }
  }

  isEditing() {
    if (
      this.props.dirty ||
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
    this.props.closeModal();
  }
  
  render() {
    const { handleSubmit, objective } = this.props;
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
                    <Field 
                      name="name" 
                      type="text"
                      placeholder="Key Result を入力してください"
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
                            placeholder="目標値を入力してください"
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
                      dateFormat="YYYY/MM/DD" 
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
  form: 'keyResultFormModal',
  validate: (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'KeyResult名を入力してください'
    }
    if (values.valueUnit && !values.targetValue) {
      errors.targetValue = "目標値を入力してください";
    }
    if (values.targetValue) {
      const targetValue = Number(values.targetValue);
      if (Number.isNaN(targetValue)) {
        errors.targetValue = "目標値は数値を入力してください";
      } else if(targetValue < 0) {
        errors.targetValue = "目標値は0以上の数値を入力してください";
      }
    }
    if (!moment(values.expiredDate).isValid()) {
      errors.expiredDate = '期限が不正です' + values.expiredDate + "hoge"
    }
    return errors
  },
  shouldError: () => true,
})(KeyResultFormModal)
