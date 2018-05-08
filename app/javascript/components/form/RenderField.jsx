import React from 'react';
import { Input, Label } from 'semantic-ui-react';

export default ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="form-item">
    <Input {...input} placeholder={placeholder} type={type} error={touched && !!error} />
    {touched && error && <Label basic color='red' pointing>{error}</Label>}
  </div>
);
