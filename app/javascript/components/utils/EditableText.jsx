import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';

class EditableText extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  }

  handleBlur = () => {
    if (this.props.value !== this.state.value) {
      this.props.saveValue(this.state.value);
    }
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleBlur();
    }
  }

  render() {
    return (
      <AutosizeInput className="ui input editable-text"
                     value={this.state.value}
                     placeholder={this.props.placeholder}
                     readOnly={this.props.readOnly}
                     onChange={this.handleChange}
                     onBlur={this.handleBlur}
                     onKeyPress={this.handleKeyPress}
      />
    );
  }
}

EditableText.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  saveValue: PropTypes.func,
};

EditableText.defaultProps = {
  value: '',
  placeholder: null,
  readOnly: false,
  saveValue: () => {},
};

export default EditableText;
