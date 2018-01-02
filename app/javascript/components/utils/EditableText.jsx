import React, { Component } from 'react';
import AutosizeInput from 'react-input-autosize';

export default class EditableText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
    };
  }

  onInputFocus = () => {
  }

  onInputBlur = () => {
    if(this.props.value !== this.state.value) {
      this.props.saveValue(this.state.value);
    }
  }

  updateInputValue = event => {
    this.setState({ value: event.target.value });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.state.value) {
      this.setState({
        value: nextProps.value
      })   
    }
  }

  render() {
    return (
      <AutosizeInput className="ui input editable-text"
                     value={this.state.value}
                     placeholder={this.props.placeholder}
                     onChange={this.updateInputValue}
                     onFocus={this.onInputFocus}
                     onBlur={this.onInputBlur}
                     readOnly={this.props.readonly} />
    );
  }
}
