import React, { Component } from 'react';
import { Transition, Message } from 'semantic-ui-react';

class ToastMessage extends Component {

  render() {
    return (
      <Transition visible={!this.props.successMessage} animation='fade' duration={1500} onHide={() => {this.props.clearMessage()}}>
        <div className='toast'>
          {this.props.successMessage ? <Message positive compact>{this.props.successMessage}</Message> : <span />}
        </div>
      </Transition>
    );
  }
}

export default ToastMessage;
