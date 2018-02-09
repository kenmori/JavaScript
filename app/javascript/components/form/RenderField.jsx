import React from 'react';
import { Input} from 'semantic-ui-react';

export default ({ input, type, placeholder, meta: { touched, error } }) => (
  <div className="form-item">
    <Input {...input} placeholder={placeholder} type={type}　/>
    {touched && error && <span className="form-item__validation-error">{error}</span>}
  </div>
);
