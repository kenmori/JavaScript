import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

export default class EditableText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      isReadOnly: true,
    };
  }

  onInputFocus = () => {
    this.setState({ isReadOnly: false });
  }

  onInputBlur = () => {
    this.setState({ isReadOnly: true });
    if(this.props.value !== this.state.value) {
      this.props.saveValue(this.state.value);
    }
  }

  updateInputValue = event => {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <AutosizeInput className="ui input editable-text"
                     value={this.state.value}
                     placeholder={this.props.placeholder}
                     onChange={this.updateInputValue}
                     onFocus={this.onInputFocus}
                     onBlur={this.onInputBlur}
                     readOnly={this.state.isReadOnly}/>
    );
  }
}
