import React from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import moment from "moment";
import { Tab, Table, Button, Divider } from "semantic-ui-react";
import SortableComponent from "../../util/SortableComponent";
import AutoInput from "../../form/AutoInput";
import DatePicker from "../../form/DatePicker";
import OkrPeriodAddForm from "./OkrPeriodAddForm";

class OkrPeriodSettingTab extends SortableComponent {
  handleNameCommit = id => name => this.props.updateOkrPeriod({ id, name });

  handleStartDateChange = id => date => {
    if (date) {
      this.props.updateOkrPeriod({ id, startDate: date.format("YYYY-MM-DD") });
    }
  };

  handleEndDateChange = id => date => {
    if (date) {
      this.props.updateOkrPeriod({ id, endDate: date.format("YYYY-MM-DD") });
    }
  };

  handleRemoveClick = (id, name) => () => {
    this.props.confirm({
      content: `OKR期間 "${name}" を削除しますか？`,
      onConfirm: () => this.props.removeOkrPeriod({ id }),
    });
  };

  render() {
    const { okrPeriodId, organizationId, okrSpan, addOkrPeriod } = this.props;
    const { okrPeriods } = this.state;

    return (
      <Tab.Pane className="okr-period-setting-tab">
        <OkrPeriodAddForm
          organizationId={organizationId}
          okrSpan={okrSpan}
          okrPeriods={okrPeriods}
          addOkrPeriod={addOkrPeriod}
        />
        <Divider />

        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell
                sorted={this.isSorted("name")}
                onClick={this.handleSort("name")}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell
                sorted={this.isSorted("startDate")}
                onClick={this.handleSort("startDate")}>
                期間 (開始日 〜 終了日)
              </Table.HeaderCell>
              <Table.HeaderCell disabled />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {okrPeriods.map(okrPeriod => {
              const id = okrPeriod.get("id");
              const name = okrPeriod.get("name");
              const startDate = okrPeriod.get("startDate");
              const endDate = okrPeriod.get("endDate");
              const disabled = id === okrPeriodId;
              return (
                <Table.Row key={id}>
                  <Table.Cell>
                    <AutoInput
                      value={name}
                      onCommit={this.handleNameCommit(id)}
                    />
                  </Table.Cell>
                  <Table.Cell>
                    <DatePicker
                      dateFormat="YYYY/M/D"
                      locale="ja"
                      selected={moment(startDate)}
                      onChange={this.handleStartDateChange(id)}
                    />
                    <span className="between">〜</span>
                    <DatePicker
                      dateFormat="YYYY/M/D"
                      locale="ja"
                      selected={moment(endDate)}
                      onChange={this.handleEndDateChange(id)}
                    />
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button
                      icon="trash"
                      onClick={this.handleRemoveClick(id, name)}
                      content="削除する"
                      negative
                      disabled={disabled}
                    />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Tab.Pane>
    );
  }
}

OkrPeriodSettingTab.propTypes = {
  // container
  okrPeriods: ImmutablePropTypes.list.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  updateOkrPeriod: PropTypes.func.isRequired,
  removeOkrPeriod: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
};

OkrPeriodSettingTab.defaultProps = {
  key: "okrPeriods",
};

export default OkrPeriodSettingTab;
