import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

class EditableMultiLineText extends Component {

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

  handleChange = (event, { value }) => {
    this.setState({ value: value });
  }

  handleBlur = () => {
    if (this.props.value !== this.state.value) {
      this.props.saveValue(this.state.value);
    }
  }

  render() {
    return (
      <TextArea className='editable-multi-line-text'
                defaultValue={this.props.value}
                placeholder={this.props.placeholder}
                rows={this.props.rows}
                autoHeight={this.props.autoHeight}
                readOnly={this.props.readOnly}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
      />
    );
  }
}

EditableMultiLineText.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  autoHeight: PropTypes.bool,
  readOnly: PropTypes.bool,
  saveValue: PropTypes.func,
};

EditableMultiLineText.defaultProps = {
  value: '',
  placeholder: null,
  rows: 3,
  autoHeight: true,
  readOnly: false,
  saveValue: () => {},
};

export default EditableMultiLineText;
