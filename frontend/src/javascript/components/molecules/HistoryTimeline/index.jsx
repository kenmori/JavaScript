import React, { PureComponent } from "react";
import { Menu, Table } from "semantic-ui-react";
import moment from "moment";
import OwnerAvatar from "../../util/OwnerAvatar";
import OkrName from "../../util/OkrName";
import Markdown from "../../util/Markdown";

class HistoryTimeline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      data: props.histories,
      direction: null,
    };
  }

  formatChangeLog(diffs) {
    let message = "";

    for (const e of diffs) {
      message += `**${e.get("column")}**を \`${e.get(
        "before",
      )}\` から \`${e.get("after")}\` へ変更\n`;
    }

    return message;
  }

  sort = (items, column, direction) => {
    if (!column) return items;

    const sortedItems = items.sort((a, b) => {
      if (typeof a.get(column) === "string") {
        return a.get(column).localeCompare(b.get(column));
      } else {
        if (a.get(column) < b.get(column)) return -1;
        if (a.get(column) > b.get(column)) return 1;
        if (a.get(column) === b.get(column)) return 0;
      }
    });
    return direction === "ascending" ? sortedItems : sortedItems.reverse();
  };

  componentDidUpdate(prevProps) {
    const { histories } = this.props;

    if (prevProps.histories !== histories) {
      this.setState({ data: histories });
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
    const { handleClick } = this.props;
    const { column, data, direction } = this.state;

    return (
      <React.Fragment>
        <Menu tabular compact>
          <Menu.Item header>タイムライン</Menu.Item>
        </Menu>
        <div className="history-timeline__table">
          <Table compact="very" size="small" selectable sortable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell disabled width={1} />
                <Table.HeaderCell
                  sorted={column === "user" ? direction : null}
                  onClick={this.handleSort("user")}>
                  更新者
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "createdAt" ? direction : null}
                  onClick={this.handleSort("createdAt")}>
                  更新日
                </Table.HeaderCell>
                <Table.HeaderCell
                  sorted={column === "name" ? direction : null}
                  onClick={this.handleSort("name")}>
                  KeyResult
                </Table.HeaderCell>
                <Table.HeaderCell disabled>内容</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body className="key-result-table">
              {data.map(e => (
                <Table.Row
                  onClick={() => handleClick(e.get("KeyResult").get("id"))}>
                  <Table.Cell textAlign="center">
                    <OwnerAvatar owner={e.get("user")} />
                  </Table.Cell>
                  <Table.Cell>
                    {`${e.get("user").get("lastName")} ${e
                      .get("user")
                      .get("firstName")}`}
                  </Table.Cell>
                  <Table.Cell>
                    {moment(e.get("createdAt")).format("YYYY/M/D H:mm")}
                  </Table.Cell>
                  <Table.Cell>
                    <OkrName okr={e.get("KeyResult")} />
                  </Table.Cell>
                  <Table.Cell>
                    <Markdown text={this.formatChangeLog(e.get("diffs"))} />
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

export default HistoryTimeline;
