import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDatePicker from 'react-datepicker';

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.borderNone = 'border-white';
    this.state = {
      className: props.likeEditable ? this.borderNone : ''
    }
  }
  handleMouseOver() {
    this.setState({
      className: ''
    })
  }
  handleMouseOut() {
    this.setState({
      className: this.borderNone
    })
  }
  componentDidMount() {
    this.refs.datePicker.querySelector('input').setAttribute("readOnly",true);
  }
  render() {
    let mouseOverHandler = () => {};
    let mouseOutHandler = () => {};
    if (this.props.likeEditable) {
      mouseOverHandler = this.handleMouseOver.bind(this);
      mouseOutHandler = this.handleMouseOut.bind(this);
    }
    return (
      <div className="date-picker" onMouseOver={mouseOverHandler} onMouseOut={mouseOutHandler} ref="datePicker">
        <ReactDatePicker className={this.state.className} {...this.props} />
      </div>
    )
  }
}

DatePicker.defaultProps = {
  likeEditable: false,
};

export default DatePicker;

