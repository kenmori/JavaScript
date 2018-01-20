import React, { Component } from 'react';
import { Transition, Message } from 'semantic-ui-react';

class ToastMessage extends Component {
  successMessage() {
    return (
      <Transition visible={!this.props.successMessage} animation='fade' duration={1500} onHide={() => {this.props.clearMessage()}}>
        {
          this.props.successMessage ? <Message positive>{this.props.successMessage}</Message> : <span/>
        }
      </Transition>
    );
  }

  render() {
    return (
      <div className='toast'>
        {this.successMessage()}
      </div>
    );
  }
}

export default ToastMessage;
