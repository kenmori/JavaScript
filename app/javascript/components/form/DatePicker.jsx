import React, { Component } from 'react';
import moment from 'moment'
import ReactDatePicker from 'react-datepicker';

class DatePicker extends Component {
  render() {
    return (
      <div className='date-picker'>
        <ReactDatePicker {...this.props} highlightDates={[moment()]} />
      </div>
    )
  }
}

export default DatePicker;
