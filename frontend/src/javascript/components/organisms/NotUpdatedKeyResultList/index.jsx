import React, { PureComponent } from "react";
import { Menu, Table, Dropdown } from "semantic-ui-react";
import moment from "moment";
import OwnerAvatar from "../../util/OwnerAvatar";
import OkrName from "../../util/OkrName";
import ProgressRate from "../../util/ProgressRate";

class NotUpdatedKeyResultList extends PureComponent {
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
        const aFullName = `${a.get("user").get("lastName")} ${a
          .get("user")
          .get("firstName")}`;
        const bFullName = `${b.get("user").get("lastName")} ${b
          .get("user")
          .get("firstName")}`;
        return aFullName.localeCompare(bFullName);
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

  render() {
    const { okrPeriodName, userName, handleClick } = this.props;
    const { column, data, direction } = this.state;

    return (
      <React.Fragment>
        <Menu tabular compact>
          <Menu.Item
            header>{`(${okrPeriodName} ${userName}さんの未更新KeyResult)`}</Menu.Item>
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
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}>
                  KeyResult
                </Table.HeaderCell>
                <Table.HeaderCell
                  width={2}
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
                <Table.HeaderCell disabled width={1}>
                  アクション
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {data.map(e => (
                <Table.Row
                  onClick={() => handleClick(e.get("KeyResult").get("id"))}>
                  <Table.Cell textAlign="center">
                    <OwnerAvatar owner={e.get("owner")} />
                  </Table.Cell>
                  <Table.Cell>
                    {`${e.get("owner").get("lastName")} ${e
                      .get("owner")
                      .get("firstName")}`}
                  </Table.Cell>
                  <Table.Cell>
                    <OkrName okr={e} />
                  </Table.Cell>
                  <Table.Cell>
                    <ProgressRate
                      value={e.get("progressRate")}
                      status={e.get("status")}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    {moment(e.get("createdAt")).format("YYYY/M/D H:mm")}
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Dropdown
                      icon="ellipsis vertical"
                      floating
                      className="icon">
                      <Dropdown.Menu>
                        <Dropdown.Item text="アナウンスメントの追加" />
                        <Dropdown.Item text="ボードの表示" />
                      </Dropdown.Menu>
                    </Dropdown>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </React.Fragment>
    );
  }
}

export default NotUpdatedKeyResultList;
