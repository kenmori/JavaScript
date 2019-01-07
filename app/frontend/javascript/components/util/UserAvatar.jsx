import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Popup, Icon } from "semantic-ui-react";
import Avatar from "./Avatar";
import UserName from "./UserName";

const sizeToIconSize = {
  mini: "small",
  tiny: "small",
  small: null,
  large: "large",
  big: "large",
  huge: "big",
  massive: "huge",
};

class UserAvatar extends PureComponent {
  clickFileInput = () => {
    if (this.props.editable) {
      this.refs.fileInput.click();
    }
  };

  openImageModal = event => {
    if (!event.target.files.length) return;
    if (this.props.user == null) return;
    this.props.openImageModal(this.props.user.get("id"), event.target.files[0]);
    event.target.value = null;
  };

  trigger = () => {
    const { isFetchedMyDetail, user, size, withInitial, withName } = this.props;

    return (
      <div
        className={`user_avatar ${this.props.editable ? "editable" : ""}`}
        onClick={this.clickFileInput}>
        {isFetchedMyDetail && (
          <Avatar user={user} size={size} withInitial={withInitial} withName={withName} />
        )}
        <input type="file" ref="fileInput" onChange={this.openImageModal} />
        {this.props.editable && (
          <Icon
            name="pencil"
            size={sizeToIconSize[this.props.size]}
            color="grey"
          />
        )}
      </div>
    );
  };

  render() {
    return (
      <Popup
        hoverable
        size="tiny"
        trigger={this.trigger()}
        open={this.props.withPopup ? undefined : false}>
        <Popup.Content>
          {this.props.isFetchedMyDetail && (
            <UserName user={this.props.user} />
          )}
        </Popup.Content>
      </Popup>
    );
  }
}

UserAvatar.propTypes = {
  // container
  isFetchedMyDetail: PropTypes.bool,
  openImageModal: PropTypes.func.isRequired,
  // component
  user: ImmutablePropTypes.map,
  size: PropTypes.string,
  withInitial: PropTypes.bool,
  withName: PropTypes.bool,
  withPopup: PropTypes.bool,
  editable: PropTypes.bool,
};
UserAvatar.defaultProps = {
  size: "small",
  withInitial: true,
  withName: false,
  withPopup: false,
  editable: false,
};

export default UserAvatar;
