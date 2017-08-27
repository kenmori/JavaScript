import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { Icon, TextArea, Segment } from 'semantic-ui-react';

export default class  EditableMultiLineText extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditable: false };
  }

  onEditClick() {
    this.setState({ isEditable: true });
  }

  onSaveClick() {
    this.props.saveValue(findDOMNode(this.textArea).value);
    this.setState({ isEditable: false });
  }

  render() {
    return (
      <div className='editable-multi-line-text'>
        {
          this.state.isEditable
            ? <TextArea defaultValue={this.props.value} ref={(node) => {this.textArea = node;}}/>
            : <Segment>{this.props.value}</Segment>
        }
        {this.props.children}
        {
          this.state.isEditable
            ? <Icon name='checkmark' onClick={this.onSaveClick.bind(this)}/>
            : <Icon name='write' onClick={this.onEditClick.bind(this)}/>
        }
      </div>
    );
  }
}
