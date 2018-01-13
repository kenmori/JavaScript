import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tab, Table, Form, Button, Input } from 'semantic-ui-react';
import EditableText from './utils/EditableText';
import DatePicker from './DatePicker';

class OkrPeriodSettingTab extends Component {
  constructor(props) {
    super(props);
    this.name = '';
    this.state = {
      column: null,
      direction: null,
      monthStart: moment(),
      monthEnd: moment(),
    };
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
    if (confirm(`OKR期間 ${name} を削除しますか？`)) {
      this.props.removeOkrPeriod({id});
    }
  };

  render() {
    const { column, direction } = this.state;
    if (!this.props.okrPeriods) {
      return null;
    }
    const okrPeriods = this.props.okrPeriods;
    return (
      <Tab.Pane attached={false} className="okr-setting-tab">
        <Form>
          <Form.Group>
            <Table singleLine sortable>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Input type="text" maxLength="255" required ref={node => { this.name = node; }} placeholder="期間名"/>
                  </Table.Cell>
                  <Table.Cell>
                    <Form.Field><DatePicker dateFormat="YYYY/MM/DD" selected={this.state.monthStart} locale="ja" onChange={date => this.setState({monthStart: date})} /></Form.Field>
                  </Table.Cell>
                  <Table.Cell>
                  <Form.Field><DatePicker dateFormat="YYYY/MM/DD" selected={this.state.monthEnd} locale="ja" onChange={date => this.setState({monthEnd: date})} /></Form.Field>
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
              <Table.HeaderCell sorted={column === 'name' ? direction : null} onClick={(event) => this.sort('id')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={column === 'month_start' ? direction : null} onClick={(event) => this.sort('lastName')}>
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
                      <EditableText value={okrPeriodName} saveValue={name => this.props.updateOkrPeriod({id, name})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Form>
                        <Form.Group>
                          <Form.Field>
                            <div className="date-input">
                              <DatePicker dateFormat="YYYY/MM/DD" locale="ja" selected={moment(monthStart)} onChange={date => this.props.updateOkrPeriod({id, monthStart: date.format()})} />
                              <div className="date-input__between">〜</div>
                              <DatePicker dateFormat="YYYY/MM/DD" locale="ja" selected={moment(monthEnd)} onChange={date => this.props.updateOkrPeriod({id, monthEnd: date.format()})} />
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
  okrPeriods: PropTypes.object,
  addOkrPeriod: PropTypes.func,
  updateOkrPeriod: PropTypes.func,
  removeOkrPeriod: PropTypes.func,
};

export default OkrPeriodSettingTab;
