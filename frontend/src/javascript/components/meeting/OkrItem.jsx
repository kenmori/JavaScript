import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Table } from "semantic-ui-react";
import OwnerAvatar from "../util/OwnerAvatar";
import ProgressRate from "../util/ProgressRate";
import OkrName from "../util/OkrName";
import OkrCard from "../map/OkrCard";


// TODO ここがなくなる予定
const GenerateKeyResultList = ({objective, keyResults, showDisabledOkrs, openOkrModal}) => {
  const keyResultIds = objective.get("keyResultIds");
  const filteredKeyResult = keyResults.filter(v => keyResultIds.includes(v.get("id"))).toArray();
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
          <div
              className={`okr-card__name ${isHighlighted ? "highlight" : ""}`}>
              <a
                onClick={this.handleObjectiveClick}
                onMouseEnter={this.handleObjectiveEnter}
                onMouseLeave={unhighlightOkr}>
            <OkrName okr={keyResult} openOkrModal={openOkrModal} />
            </a>
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

const OkrItem = React.memo((props) => (
  <OkrCard {...props}
  />
))

OkrItem.propTypes = {
  objective: ImmutablePropTypes.map.isRequired,
  keyResults: ImmutablePropTypes.list.isRequired,
  showDisabledOkrs: PropTypes.bool.isRequired,
};

export default OkrItem;
