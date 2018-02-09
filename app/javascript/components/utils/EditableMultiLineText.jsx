import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

class EditableMultiLineText extends Component {

  handleCommit = event => {
    if (this.props.value !== event.target.value) {
      this.props.onCommit(event.target.value);
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
                onBlur={this.handleCommit}
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
  onCommit: PropTypes.func,
};

EditableMultiLineText.defaultProps = {
  value: '',
  placeholder: null,
  rows: 3,
  autoHeight: true,
  readOnly: false,
  onCommit: value => {},
};

export default EditableMultiLineText;
