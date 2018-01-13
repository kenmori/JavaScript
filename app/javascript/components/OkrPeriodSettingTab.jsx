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

  componentWillMount() {
    this.props.fetchObjectives(this.props.loginUserId);
  }

  shouldComponentUpdate(nextProps) {
    return this.isChangedObjectiveName(nextProps) || this.isChangedObjectiveMonthStart(nextProps) || this.isChangedObjectiveMonthEnd(nextProps);
  }

  isChangedArr(arr1, arr2) {
    const mergeArr = [...arr1, ...arr2];
    const resultArr = []
    
    for (let [i, v] of mergeArr.entries()) {
      if(!arr1.includes(v)) resultArr.push(v)
      if(!arr2.includes(v)) resultArr.push(v)
    }

    return !!resultArr.length;
  }

  isChangedObjectiveName(nextProps) {
    const newArr = nextProps.objectives.map(item => item.get('name')).toArray();
    const currentArr = this.props.objectives.map(item => item.get('name')).toArray();
    return this.isChangedArr(newArr, currentArr);
  }

  isChangedObjectiveMonthStart(nextProps) {
    const newArr = nextProps.objectives.map(item => item.get('okrPeriod').get('monthStart')).toArray();
    const currentArr = this.props.objectives.map(item => item.get('okrPeriod').get('monthStart')).toArray();
    return this.isChangedArr(newArr, currentArr);
  }

  isChangedObjectiveMonthEnd(nextProps) {
    const newArr = nextProps.objectives.map(item => item.get('okrPeriod').get('monthEnd')).toArray();
    const currentArr = this.props.objectives.map(item => item.get('okrPeriod').get('monthEnd')).toArray();
    return this.isChangedArr(newArr, currentArr);
  }

  render() {
    const objectives = Array.from(this.props.objectives);
    const { column, direction } = this.state;
    if (objectives.length === 0) {
      return null;
    }
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
              objectives.map(objective => {
                const id = objective.get('id');
                const objectiveName = objective.get('name');
                const monthStart = objective.get('okrPeriod').get('monthStart');
                const monthEnd = objective.get('okrPeriod').get('monthEnd');
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <EditableText value={objectiveName} saveValue={name => this.props.updateObjective({id, name})}/>
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
  loginUserId: PropTypes.number,
  objectives: PropTypes.object,
  fetchObjectives: PropTypes.func,
  addObjective: PropTypes.func,
  updateObjective: PropTypes.func,
  removeObjective: PropTypes.func,
};

export default OkrPeriodSettingTab;
