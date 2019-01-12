import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Table } from "semantic-ui-react";
import OwnerAvatar from "../util/OwnerAvatar";
import ProgressRate from "../util/ProgressRate";
import OkrName from "../util/OkrName";

class OkrItem extends PureComponent {
  constructor(props) {
    super(props);
  }

  generateKeyResultList = objective => {
    const { keyResults, showDisabledOkrs } = this.props;
    const keyResultIds = objective.get("keyResultIds");
    const filteredKeyResult = keyResults
      .filter(v => keyResultIds.includes(v.get("id")))
      .toArray();

    return filteredKeyResult.map(keyResult => {
      if (!showDisabledOkrs && keyResult.get("disabled")) {
        return null;
      }

      return (
        <Table.Row key={keyResult.get("id")}>
          <Table.Cell>
            <OwnerAvatar
              owner={keyResult.get("owner")}
              members={keyResult.get("members")}
            />
          </Table.Cell>
          <Table.Cell>
            <div className="okr-card__name">
              <OkrName okr={keyResult} />
            </div>
          </Table.Cell>
          <Table.Cell>
            <ProgressRate
              value={keyResult.get("progressRate")}
              status={keyResult.get("status")}
            />
          </Table.Cell>
        </Table.Row>
      );
    });
  };

  render() {
    const { objective } = this.props;

    return (
      <div className="very basic meeting-board__okr">
        <Table className="very basic meeting-board__okr__table">
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                <OwnerAvatar owner={objective.get("owner")} />
              </Table.Cell>
              <Table.Cell>
                <div className="okr-card__name">
                  <OkrName okr={objective} />
                </div>
              </Table.Cell>
              <Table.Cell>
                <ProgressRate value={objective.get("progressRate")} />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table className="very basic">
          <Table.Body>{this.generateKeyResultList(objective)}</Table.Body>
        </Table>
      </div>
    );
  }
}

OkrItem.propTypes = {
  objective: ImmutablePropTypes.map.isRequired,
  keyResults: ImmutablePropTypes.list.isRequired,
  showDisabledOkrs: PropTypes.bool.isRequired,
};

export default OkrItem;
