import React, { Component } from 'react';
import { Transition, Message } from 'semantic-ui-react';

class Toast extends Component {

  constructor(props) {
    super(props)
    this.state = { visible: false };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      this.setState({ visible: true });
      setTimeout(() => this.setState({ visible: false }), 3000);
    }
  }

  render() {
    return (
      <Transition visible={this.state.visible} onHide={this.props.clearToast}>
        <div className='toast'>
          <Message positive compact>{this.props.message}</Message>
        </div>
      </Transition>
    );
  }
}

export default Toast;
