import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Field } from 'redux-form'
import { Form, TextArea } from 'semantic-ui-react'
import KeyResultMemberSelect from '../form/KeyResultMemberSelect'
import UserSelect from '../form/UserSelect'
import RequiredLabel from '../form/RequiredLabel'
import RenderField from '../form/RenderField'
import RenderDateField from '../form/RenderDateField'
import {
  validateKeyResultName, validateTargetValue, validateExpiredDate, normalizeExpiredDate
} from '../../utils/validator'

class KeyResultForm extends PureComponent {

  handleDescriptionChange = (e, { value }) => this.props.onChange({ description: value })

  handleValueUnitChange = (e, valueUnit) => this.props.onChange({ isRequiredTargetValue: !!valueUnit })

  handleOwnerChange = ownerId => this.props.onChange({ ownerId, members: this.props.members.filter(id => id !== ownerId) })

  handleKeyResultMemberAdd = value => this.props.onChange({ members: this.props.members.push(value) })

  handleKeyResultMemberRemove = value => this.props.onChange({ members: this.props.members.filter(id => id !== value) })

  render() {
    return (
      <Form>
        <Form.Group widths='equal'>
          <Form.Field>
            <RequiredLabel text='Key Result' />
            <Field
              name='name'
              component={RenderField}
              validate={validateKeyResultName}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group widths='equal'>
          <Form.Field>
            <label>説明</label>
            <TextArea
              autoHeight
              rows={3}
              onChange={this.handleDescriptionChange}
              placeholder={'Key Result についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。\n(Markdown を記述できます)'}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <div className="flex-start">
              <div style={{ marginRight: '10px' }}>
                <RequiredLabel text='目標値' required={this.props.isRequiredTargetValue} />
                <div style={{ width: '177px' }}>
                  <Field
                    name='targetValue'
                    component={RenderField}
                    validate={validateTargetValue}
                  />
                </div>
              </div>
              <div>
                <label>単位</label>
                <Field
                  name='valueUnit'
                  placeholder='例：円、件、人'
                  component={RenderField}
                  onChange={this.handleValueUnitChange}
                />
              </div>
            </div>
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <RequiredLabel text='期限' />
            <Field
              name='expiredDate'
              component={RenderDateField}
              validate={validateExpiredDate}
              normalize={normalizeExpiredDate}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <RequiredLabel text='責任者' />
            <UserSelect
              users={this.props.users}
              value={this.props.ownerId}
              onChange={this.handleOwnerChange}
            />
          </Form.Field>
        </Form.Group>
        <Form.Group>
          <Form.Field>
            <label>関係者</label>
            <KeyResultMemberSelect
              users={this.props.users}
              members={this.props.members}
              excludedId={this.props.ownerId}
              add={this.handleKeyResultMemberAdd}
              remove={this.handleKeyResultMemberRemove}
            />
          </Form.Field>
        </Form.Group>
      </Form>
    )
  }
}

KeyResultForm.propTypes = {
  // container
  // component
  users: ImmutablePropTypes.list.isRequired,
  members: ImmutablePropTypes.list.isRequired,
  ownerId: PropTypes.number,
  isRequiredTargetValue: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default KeyResultForm
