import React, { PureComponent } from 'react';
import moment from 'moment'
import { Label } from 'semantic-ui-react'
import DatePicker from './DatePicker';

class RenderDateField extends PureComponent {

  render() {
    const {
      input: { value, onChange, onBlur },
      meta: { touched, error },
    } = this.props
    const selected = moment(value, 'YYYY/M/D')
    return (
      <div className="form-item">
        <DatePicker
          className={(touched && !!error) ? 'error' : undefined}
          dateFormat='YYYY/M/D'
          locale='ja'
          selected={selected.isValid() ? selected : null}
          onChange={date => onChange(date)}
          onBlur={e => onBlur(e)}
        />
        {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </div>
    )
  }
}

RenderDateField.propTypes = {}

export default RenderDateField
