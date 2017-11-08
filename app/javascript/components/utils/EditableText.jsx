import React, { Component } from 'react';
import { Icon, Input } from 'semantic-ui-react';

export default class  EditableText extends Component {
  constructor(props) {
    super(props);
    this.state = { isEditable: false };
  }

  onEditClick() {
    this.setState({ isEditable: true });
  }

  onSaveClick() {
    this.setState({ isEditable: false });
    this.props.saveValue(this.input.inputRef.value);
  }

  render() {
    return (
      <div className='editable-text'>
        {
          this.state.isEditable
            ? <Input style={{ width: this.props.value.length + 'rem', minWidth: '1em' }} defaultValue={this.props.value} ref={(node) => {this.input = node;}}/>
            : <span>{this.props.value}</span>
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
