import React from 'react';
import DatePicker from './DatePicker';

export default ({ input, type, dateFormat, locale, selected, handleCalendar, meta: { touched, error } }) => {
  delete input.value
  return (
    <div className="form-item">
      <DatePicker {...input}
                  type={type}
                  value={selected.format(dateFormat)}
                  dateFormat={dateFormat}
                  locale={locale}
                  selected={selected}
                  onChange={handleCalendar}
      />
      {touched && error && <span className="form-item__validation-error">{error}</span>}
    </div>
  )
};
