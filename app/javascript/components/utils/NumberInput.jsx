import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'semantic-ui-react';

class NumberInput extends Component {

  handleChange = event => {
    this.props.onChange(event.target.value);
  }

  handleCommit = event => {
    this.props.onCommit(event.target.value);
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleCommit(event);
    }
  }

  handleMouseUp = event => {
    this.props.onMouseUp(event.target.value);
  }

  render() {
    return (
      <Input className='number-input'
             type={this.props.type}
             min={this.props.min} max={this.props.max} step={this.props.step}
             label={this.props.label ? { basic: true, content: this.props.label } : null} labelPosition='right'
             value={this.props.value}
             readOnly={this.props.readOnly}
             onChange={this.handleChange}
             onBlur={this.handleCommit}
             onKeyPress={this.handleKeyPress}
             onMouseUp={this.handleMouseUp}
             onTouchEnd={this.handleMouseUp}
      />
    );
  }
}

NumberInput.propTypes = {
  type: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onCommit: PropTypes.func,
  onMouseUp: PropTypes.func,
};

NumberInput.defaultProps = {
  type: 'number',
  min: 0,
  max: 100,
  step: 1,
  label: null,
  value: 0,
  readOnly: false,
  onChange: value => {},
  onCommit: value => {},
  onMouseUp: value => {},
};

export default NumberInput;
