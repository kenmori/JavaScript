import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Table, Button } from "semantic-ui-react";
import SortableComponent from "../util/SortableComponent";
import OwnerAvatar from "../util/OwnerAvatar";
import ProgressRate from "../util/ProgressRate";
import OkrName from "../util/OkrName";

class KeyResultList extends SortableComponent {
  selectKeyResult = keyResult => () => this.props.selectKeyResult(keyResult);

  handleKeyResultClick = keyResultId => () =>
    this.props.openOKRModal(null, keyResultId);

  checkObjectiveOwner = (keyResult, loginUserId) => {
    const objectiveOwner = this.props.objectives
      .toArray()
      .filter(
        objective => objective.get("id") === keyResult.get("objectiveId"),
      );

    return objectiveOwner.length > 0
      ? objectiveOwner[0].getIn(["owner", "id"]) === loginUserId
      : false;
  };

  render() {
    const { keyResults } = this.state;
    const loginUserId = this.props.loginUserId;
    const isAdmin = this.props.isAdmin;

    return (
      <div className="key-result-list">
        <Table basic="very" compact="very" size="small" selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell disabled width={1} />
              <Table.HeaderCell
                sorted={this.isSorted("name")}
                onClick={this.handleSort("name")}>
                Key Result
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.isSorted("targetValue")}
                onClick={this.handleSort("targetValue")}>
                目標値
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.isSorted("actualValue")}
                onClick={this.handleSort("actualValue")}>
                実績値
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.isSorted("progressRate")}
                onClick={this.handleSort("progressRate")}>
                進捗
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.isSorted("expiredDate")}
                onClick={this.handleSort("expiredDate")}>
                期限
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>編集</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className="key-result-table">
            {keyResults.map(keyResult => (
              <Table.Row
                key={keyResult.get("id")}
                active={keyResult.get("id") === this.props.selectedKeyResultId}
                onClick={this.selectKeyResult(keyResult)}>
                <Table.Cell textAlign="center">
                  <OwnerAvatar
                    owner={keyResult.get("owner")}
                    members={keyResult.get("members")}
                  />
                </Table.Cell>
                <Table.Cell>
                  <OkrName okr={keyResult} />
                </Table.Cell>
                <Table.Cell>
                  {keyResult.get("targetValue")} {keyResult.get("valueUnit")}
                </Table.Cell>
                <Table.Cell>
                  {keyResult.get("actualValue")} {keyResult.get("valueUnit")}
                </Table.Cell>
                <Table.Cell>
                  <ProgressRate
                    value={keyResult.get("progressRate")}
                    status={keyResult.get("status")}
                  />
                </Table.Cell>
                <Table.Cell>{keyResult.get("expiredDate")}</Table.Cell>
                <Table.Cell textAlign="center">
                  {isAdmin ||
                  keyResult.getIn(["owner", "id"]) === loginUserId ||
                  this.checkObjectiveOwner(keyResult, loginUserId) ? (
                    <Button
                      compact
                      content="編集する"
                      size="small"
                      onClick={this.handleKeyResultClick(keyResult.get("id"))}
                    />
                  ) : null}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

KeyResultList.propTypes = {
  // container
  selectedKeyResultId: PropTypes.number,
  selectKeyResult: PropTypes.func.isRequired,
  isAdmin: PropTypes.bool,
  // component
  openOKRModal: PropTypes.func.isRequired,
  keyResults: ImmutablePropTypes.list.isRequired,
};

KeyResultList.defaultProps = {
  key: "keyResults",
};

export default KeyResultList;
