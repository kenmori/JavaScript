import React, { PureComponent } from "react";
import { Menu, Table } from "semantic-ui-react";
import { Map } from "immutable";
import moment from "moment";
import OwnerAvatar from "../../util/OwnerAvatar";
import OkrName from "../../util/OkrName";
import ProgressRate from "../../util/ProgressRate";

class OwnerShipKeyResultList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: props.keyResults,
      direction: null,
    };
  }

  sort = (items, column, direction) => {
    if (!column) return items;

    const sortedItems = items.sort((a, b) => {
      if (typeof a.get(column) === "string") {
        return a.get(column).localeCompare(b.get(column));
      } else if (column === "owner") {
        const aOwner = a.get("owner");
        const bOwner = b.get("owner");
        const aFullName = `${aOwner.get("lastName")} ${aOwner.get(
          "firstName",
        )}`;
        const bFullName = `${bOwner.get("lastName")} ${bOwner.get(
          "firstName",
        )}`;
        return aFullName.localeCompare(bFullName);
      } else if (column === "objective") {
        const { objectives } = this.props;
        const aObjective =
          objectives
            .filter(e => e.get("id") == a.get("objectiveId"))
            .first() || Map();
        const bObjective =
          objectives
            .filter(e => e.get("id") == b.get("objectiveId"))
            .first() || Map();
        return aObjective.get("name").localeCompare(bObjective.get("name"));
      } else {
        if (a.get(column) < b.get(column)) return -1;
        if (a.get(column) > b.get(column)) return 1;
        if (a.get(column) === b.get(column)) return 0;
      }
    });
    return direction === "ascending" ? sortedItems : sortedItems.reverse();
  };

  componentDidUpdate(prevProps) {
    const { keyResults } = this.props;

    if (prevProps.keyResults !== keyResults) {
      this.setState({ data: keyResults });
    }
  }

  handleSort = clickedColumn => () => {
    const { column, data, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        data: this.sort(data, clickedColumn, direction),
        direction: "ascending",
      });

      return;
    }

    this.setState({
      data: data.reverse(),
      direction: direction === "ascending" ? "descending" : "ascending",
    });
  };

  handleOpenOKRModal(keyResultId) {
    const { openOkrModal } = this.props;

    openOkrModal(keyResultId);
  }

  render() {
    const { objectives } = this.props;
    const { column, data, direction } = this.state;

    return (
      <React.Fragment>
        <Menu className="not-updated-key-results__header" tabular compact>
          <Menu.Item header>Key Result一覧</Menu.Item>
        </Menu>
        <div className="not-updated-key-results__table">
          <Table compact="very" size="small" selectable sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell disabled width={1} />
                <Table.HeaderCell
                  width={2}
                  sorted={column === "owner" ? direction : null}
                  onClick={this.handleSort("owner")}>
                  責任者
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
                  sorted={column === "objective" ? direction : null}
                  onClick={this.handleSort("objective")}>
                  Objective
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={3}
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}>
                  Key Result
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "progressRate" ? direction : null}
                  onClick={this.handleSort("progressRate")}>
                  進捗率
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={1}
                  sorted={column === "updatedAt" ? direction : null}
                  onClick={this.handleSort("updatedAt")}>
                  最終更新日
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(keyResult => {
                const objective =
                  objectives
                    .filter(e => e.get("id") == keyResult.get("objectiveId"))
                    .first() || Map();
                return (
                  <Table.Row
                    key={keyResult.get("id")}
                    onClick={this.handleOpenOKRModal.bind(
                      this,
                      keyResult.get("id"),
                    )}>
                    <Table.Cell textAlign="center">
                      <OwnerAvatar owner={keyResult.get("owner")} />
                    </Table.Cell>
                    <Table.Cell>
                      {`${keyResult
                        .get("owner")
                        .get("lastName")} ${keyResult
                        .get("owner")
                        .get("firstName")}`}
                    </Table.Cell>
                    <Table.Cell>
                      <OkrName okr={objective} />
                    </Table.Cell>
                    <Table.Cell>
                      <OkrName okr={keyResult} />
                    </Table.Cell>
                    <Table.Cell>
                      <ProgressRate
                        value={keyResult.get("progressRate")}
                        status={keyResult.get("status")}
                      />
                    </Table.Cell>
                    <Table.Cell>
                      {moment(keyResult.get("updatedAt")).format(
                        "YYYY/M/D H:mm",
                      )}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default OwnerShipKeyResultList;
