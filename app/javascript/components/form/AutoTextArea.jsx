import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'semantic-ui-react';

class AutoTextArea extends PureComponent {

  handleCommit = event => {
    if (this.props.value !== event.target.value) {
      this.props.onCommit(event.target.value);
    }
  }

  render() {
    return (
      <TextArea className='auto-text-area'
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

AutoTextArea.propTypes = {
  // container
  // component
  value: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  autoHeight: PropTypes.bool,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
};

AutoTextArea.defaultProps = {
  value: '',
  placeholder: null,
  rows: 3,
  autoHeight: true,
  readOnly: false,
  onCommit: value => {},
};

export default AutoTextArea;
