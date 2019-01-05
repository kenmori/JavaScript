import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Button, Popup } from "semantic-ui-react";

class ToggleButton extends PureComponent {
  render() {
    const { on, visible, onClick } = this.props;
    return (
      <Popup
        hoverable
        size="tiny"
        position="right center"
        content={`下位 OKR を${on ? "折りたたむ" : "展開する　"}`} // Popup 幅を揃えるため末尾に空白を入れる
        trigger={
          <Button
            className={`toggle-button ${visible ? "visible" : "hidden"}`}
            circular
            basic
            compact
            icon="sitemap"
            size="small"
            active={on}
            onClick={onClick}
          />
        }
      />
    );
  }
}

ToggleButton.propTypes = {
  // container
  // component
  on: PropTypes.bool.isRequired,
  visible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ToggleButton;
