import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Label, Popup } from "semantic-ui-react";

class PopupLabel extends PureComponent {
  render() {
    const { icon, text, tips, onClick } = this.props;
    return (
      <Popup
        hoverable
        size="tiny"
        position="bottom left"
        content={tips}
        trigger={
          <Label
            pointing="left"
            as="a"
            icon={icon}
            content={text}
            onClick={onClick}
          />
        }
      />
    );
  }
}

PopupLabel.propTypes = {
  // container
  // component
  icon: PropTypes.string,
  text: PropTypes.string,
  tips: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

PopupLabel.defaultProps = {
  icon: null,
  text: null,
};

export default PopupLabel;
