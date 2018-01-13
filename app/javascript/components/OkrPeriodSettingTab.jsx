import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Tab, Table, Form, Button } from 'semantic-ui-react';
import EditableText from './utils/EditableText';
import DatePicker from './DatePicker';

class OkrPeriodSettingTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      column: null,
      direction: null,
    };
  }

  render() {
    const { column, direction } = this.state;
    console.log(3, this.props.okrPeriods)
    console.log(3, this.props.okrPeriods)
    if (!this.props.okrPeriods) {
      return null;
    }
    const okrPeriods = this.props.okrPeriods;
    return (
      <Tab.Pane attached={false} className="okr-setting-tab">
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
                const okrPeripdName = okrPeriod.get('name');
                const monthStart = okrPeriod.get('monthStart');
                const monthEnd = okrPeriod.get('monthEnd');
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <EditableText value={okrPeripdName} saveValue={name => this.props.updateObjective({id, name})}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Form>
                        <Form.Group>
                          <Form.Field>
                            <div className="date-input">
                              <DatePicker dateFormat="YYYY/MM/DD" locale="ja" selected={moment(monthStart)} onChange={console.log} />
                              <div className="date-input__between">〜</div>
                              <DatePicker dateFormat="YYYY/MM/DD" locale="ja" selected={moment(monthEnd)} onChange={console.log} />
                            </div>
                          </Form.Field>
                        </Form.Group>
                      </Form>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button icon="trash" onClick={console.log} title="削除" negative/>
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
  okrPeriods: PropTypes.object,
  addOkrPeriod: PropTypes.func,
  updateOkrPeriod: PropTypes.func,
  removeOkrPeriod: PropTypes.func,
};

export default OkrPeriodSettingTab;
