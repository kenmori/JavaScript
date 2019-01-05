import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Button } from "semantic-ui-react";

class EmptyMap extends PureComponent {
  render() {
    const { isFetched, openObjectiveModal } = this.props;
    if (!isFetched) return null;
    return (
      <Segment compact padded="very" textAlign="center" className="empty-map">
        <Header as="h4">Objective がありません</Header>
        <Button
          icon="plus"
          content="OKR を作成する"
          onClick={openObjectiveModal}
        />
      </Segment>
    );
  }
}

EmptyMap.propTypes = {
  // container
  isFetched: PropTypes.bool.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  // component
};

export default EmptyMap;
