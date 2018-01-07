import React, { Component } from 'react';
import ReactDatePicker from 'react-datepicker';

class DatePicker extends Component {
  render() {
    return (
      <div className='date-picker'>
        <ReactDatePicker {...this.props} />
      </div>
    )
  }
}

export default DatePicker;
