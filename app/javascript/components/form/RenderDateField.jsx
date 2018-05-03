import React from 'react';
import { Label } from 'semantic-ui-react'
import DatePicker from './DatePicker';

export default ({ input: { value, onChange, onBlur }, meta: { touched, error } }) => (
  <div className="form-item">
    <DatePicker
      dateFormat='YYYY/M/D'
      locale='ja'
      selected={(value && value.isValid()) ? value : null}
      onChange={date => onChange(date)}
      onBlur={e => onBlur(e)}
    />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </div>
)
