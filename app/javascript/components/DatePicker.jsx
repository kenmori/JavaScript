import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

class DatePicker extends Component {
  componentDidMount() {
    this.refs.datePicker.querySelector('input').setAttribute("readOnly",true);
  }

  render() {
    return (
      <div className="date-picker" ref="datePicker">
        <ReactDatePicker {...this.props} />
      </div>
    )
  }
}

export default DatePicker;

