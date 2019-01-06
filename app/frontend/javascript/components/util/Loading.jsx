import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Loader } from "semantic-ui-react";

class Loading extends PureComponent {
  render() {
    if (!this.props.isOpened) {
      return null;
    }
    return (
      <div className="loading">
        <div className="loading__inner">
          <Loader active />
        </div>
      </div>
    );
  }
}

Loading.propTypes = {
  // container
  isOpened: PropTypes.bool.isRequired,
  // component
};
Loading.defaultProps = {
  isOpened: false,
};

export default Loading;
