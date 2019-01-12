import React, { PureComponent } from "react";
import { Transition, Message } from "semantic-ui-react";
import PropTypes from "prop-types";

class Toast extends PureComponent {
  constructor(props) {
    super(props);
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
        <div className="toast">
          <Message
            compact
            info={this.props.type === "info"}
            warning={this.props.type === "warning"}
            error={this.props.type === "error"}
            success={this.props.type === "success"}>
            {this.props.message}
          </Message>
        </div>
      </Transition>
    );
  }
}

Toast.propTypes = {
  // container
  message: PropTypes.object, // String: 同じ文言のトーストを続けて表示するため String オブジェクトを受け取る
  type: PropTypes.string,
  clearToast: PropTypes.func.isRequired,
  // component
};

export default Toast;
