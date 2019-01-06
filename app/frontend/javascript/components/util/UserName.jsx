import React, { PureComponent } from "react";
import ImmutablePropTypes from "react-immutable-proptypes";

class UserName extends PureComponent {
  render() {
    const { user } = this.props;
    const isDisabled = user.get("disabled");
    return (
      <span className={`user-name ${isDisabled ? "disabled" : ""}`}>
        <span className="user-name__text">
          {user.get("lastName")} {user.get("firstName")}
        </span>
      </span>
    );
  }
}

UserName.propTypes = {
  // container
  // component
  user: ImmutablePropTypes.map.isRequired,
};

export default UserName;
