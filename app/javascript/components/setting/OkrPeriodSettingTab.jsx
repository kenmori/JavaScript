import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tab, Table, Form, Button, Input } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import DatePicker from '../form/DatePicker';

class OkrPeriodSettingTab extends Component {
  constructor(props) {
    super(props);
    this.name = '';
    const okrPeriods = this.props.okrPeriods;
    const monthStart = this.getMonthStart(okrPeriods);
    const monthEnd = this.getMonthEnd(monthStart);
    this.state = {
      column: null,
      direction: null,
      okrPeriods: this.props.okrPeriods,
      monthStart: monthStart,
      monthEnd: monthEnd,
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.okrPeriods) {
      const okrPeriods = this.state.column 
                          ? this.getSortedOkrPeriods(nextProps.okrPeriods, this.state.column) 
                          : nextProps.okrPeriods;
      const monthStart = this.getMonthStart(nextProps.okrPeriods);
      const monthEnd = this.getMonthEnd(monthStart);

      this.setState({
        okrPeriods,
        monthStart,
        monthEnd,
      })
    }
  }

  getMonthStart(okrPeriods) {
    const endDateList = okrPeriods.map(item => item.get('monthEnd')).sort().toArray();
    const endDate = endDateList[endDateList.length - 1]
    return moment(endDate).add(1, 'day')
  }

  getMonthEnd(monthStart) {
    return monthStart.clone().add(this.props.okrSpan - 1, 'month').endOf('month');
  }

  sort(column) {
    if (this.state.column !== column) {
      const sortedOkrPeriods = this.getSortedOkrPeriods(this.state.okrPeriods, column);
      this.setState({
        column: column,
        okrPeriods: sortedOkrPeriods,
        direction: 'ascending',
      });
      return;
    }

    this.setState({
      okrPeriods: this.state.okrPeriods.reverse(),
      direction: this.state.direction === 'ascending' ? 'descending' : 'ascending',
    });
  };

  getSortedOkrPeriods = (okrPeriods, column) => {
    return okrPeriods.sort((a, b) => {
      if (typeof a.get(column) === 'string') {
        return a.get(column).localeCompare(b.get(column));
      } else {
        if (a.get(column) < b.get(column)) { return -1; }
        if (a.get(column) > b.get(column)) { return 1; }
        if (a.get(column) === b.get(column)) { return 0; }
      }
    });
  }

  addOkrPeriod() {
    this.props.addOkrPeriod({
      name: this.name.inputRef.value,
      monthStart: this.state.monthStart.format(),
      monthEnd: this.state.monthEnd.format(),
      organizationId: this.props.organizationId,
    })
  }

  removeOkrPeriod(id, name){
    this.props.confirm({
      content: `OKR期間 ${name} を削除しますか？`,
      onConfirm: () => this.props.removeOkrPeriod({ id }),
    });
  };

  render() {
    const { column, direction } = this.state;
    if (!this.props.okrPeriods) {
      return null;
    }
    const okrPeriods = this.state.okrPeriods;
    return (
      <Tab.Pane attached={false} className="okr-setting-tab">
        <Form>
          <Form.Group>
            <Table singleLine sortable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input type="text" maxLength="255" ref={node => { this.name = node; }} placeholder="期間名"/>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field><DatePicker dateFormat="YYYY/M/D" selected={this.state.monthStart} locale="ja" onChange={date => this.setState({monthStart: date})} /></Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                  <Form.Field><DatePicker dateFormat="YYYY/M/D" selected={this.state.monthEnd} locale="ja" onChange={date => this.setState({monthEnd: date})} /></Form.Field>
                  </Table.Cell>
                  <Table.Cell textAlign="center">
                    <Button icon="plus" content="追加する" onClick={this.addOkrPeriod.bind(this)}/>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </Form.Group>
        </Form>
        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={(event) => this.sort('name')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'month_start' ? direction : null} onClick={(event) => this.sort('month_start')}>
                期間
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              okrPeriods.map(okrPeriod => {
                const id = okrPeriod.get('id');
                const okrPeriodName = okrPeriod.get('name');
                const monthStart = okrPeriod.get('monthStart');
                const monthEnd = okrPeriod.get('monthEnd');
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <AutoInput value={okrPeriodName} onCommit={name => this.props.updateOkrPeriod({id, name})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Form>
                        <Form.Group>
                          <Form.Field>
                            <div className="date-input">
                              <DatePicker dateFormat="YYYY/M/D" locale="ja" selected={moment(monthStart)} onChange={date => this.props.updateOkrPeriod({id, monthStart: date.format()})} />
                              <div className="date-input__between">〜</div>
                              <DatePicker dateFormat="YYYY/M/D" locale="ja" selected={moment(monthEnd)} onChange={date => this.props.updateOkrPeriod({id, monthEnd: date.format()})} />
                            </div>
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button icon="trash" onClick={() => this.removeOkrPeriod(id, okrPeriodName)} title="削除" negative/>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            }
          </Table.Body>
        </Table>
      </Tab.Pane>
    );
  }
}

OkrPeriodSettingTab.propTypes = {
  organizationId: PropTypes.number,
  okrSpan: PropTypes.number,
  okrPeriods: PropTypes.object,
  addOkrPeriod: PropTypes.func,
  updateOkrPeriod: PropTypes.func,
  removeOkrPeriod: PropTypes.func,
};

export default OkrPeriodSettingTab;
