import React, { PureComponent } from 'react';
import moment from 'moment'
import ReactDatePicker from 'react-datepicker';
import PropTypes from 'prop-types'

class DatePicker extends PureComponent {
  render() {
    return (
      <div className='ui input date-picker'>
        <ReactDatePicker {...this.props} highlightDates={[moment()]} />
      </div>
    )
  }
}

DatePicker.propTypes = {
  // container
  // component
  dateFormat: PropTypes.string,
  locale: PropTypes.string,
  selected: PropTypes.object, // Moment
  onChange: PropTypes.func,
}

export default DatePicker;
