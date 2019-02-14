import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";

class OkrName extends PureComponent {
  render() {
    const { okr, openOkrModal, objectiveId, keyResultId } = this.props;
    const isDisabled = okr.get("disabled");
    return (
      <span onClick={() => openOkrModal(objectiveId, keyResultId)} className={`okr-name ${isDisabled ? "disabled" : ""}`}>
        <span className="okr-name__text">{okr.get("name")}</span>
      </span>
    );
  }
}

OkrName.propTypes = {
  // container
  // component
  okr: ImmutablePropTypes.map.isRequired,
  objectiveId: PropTypes.number.isRequired,
  keyResultId: PropTypes.number.isRequired,
  openOkrModal: PropTypes.func.isRequired
};

export default OkrName;
