import React, { Component } from 'react';
import { Transition, Message } from 'semantic-ui-react';

class Toast extends Component {

  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      timeoutId: -1,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.message) {
      clearTimeout(this.state.timeoutId); // 現在表示中のトーストを非表示にするタイマーをキャンセルする
      this.setState({
        visible: true,
        timeoutId: setTimeout(() => {
          this.setState({
            visible: false,
            timeoutId: -1,
          });
        }, 3000),
      });
    }
  }

  render() {
    return (
      <Transition visible={this.state.visible} onHide={this.props.clearToast}>
        <div className='toast'>
          <Message compact
                   info={this.props.type === 'info'}
                   warning={this.props.type === 'warning'}
                   error={this.props.type === 'error'}
                   success={this.props.type === 'success'}
          >{this.props.message}</Message>
        </div>
      </Transition>
    );
  }
}

export default Toast;
