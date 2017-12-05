import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { TextArea } from 'semantic-ui-react';

export default class EditableMultiLineText extends Component {
  constructor(props) {
    super(props);
    this.state = { isReadOnly: true };
  }

  onTextAreaFocus = () => {
    this.setState({ isReadOnly: false });
  }

  onTextAreaBlur = () => {
    this.setState({ isReadOnly: true });
    this.props.saveValue(findDOMNode(this.textArea).value);
  }

  render() {
    const classNames = ['editable-multi-line-text'];
    if(this.props.className) {
      classNames.push(this.props.className);
    }
    return (
      <TextArea className={classNames.join(' ')}
                defaultValue={this.props.value}
                ref={node => {this.textArea = node;}}
                placeholder={this.props.placeholder}
                rows={3}
                onFocus={this.onTextAreaFocus}
                onBlur={this.onTextAreaBlur}
                readOnly={this.state.isReadOnly}/>
    );
  }
}
