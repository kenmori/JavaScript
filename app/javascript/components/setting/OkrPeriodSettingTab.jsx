import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import moment from 'moment';
import { Tab, Table, Button, Divider } from 'semantic-ui-react';
import SortableComponent from '../util/SortableComponent'
import AutoInput from '../form/AutoInput';
import DatePicker from '../form/DatePicker';
import OkrPeriodAddForm from '../../containers/OkrPeriodAddForm'

class OkrPeriodSettingTab extends SortableComponent {

  handleNameCommit = id => name => this.props.updateOkrPeriod({ id, name })

  handleMonthStartChange = id => date => this.props.updateOkrPeriod({ id, monthStart: date.format('YYYY-MM-DD') })

  handleMonthEndChange = id => date => this.props.updateOkrPeriod({ id, monthEnd: date.format('YYYY-MM-DD') })

  handleRemoveClick = (id, name) => () => {
    this.props.confirm({
      content: `OKR期間 "${name}" を削除しますか？`,
      onConfirm: () => this.props.removeOkrPeriod({ id }),
    })
  }

  render() {
    const { okrPeriodId } = this.props
    const { okrPeriods } = this.state
    return (
      <Tab.Pane attached={false} className="okr-period-setting-tab">
        <OkrPeriodAddForm />

        <Divider />

        <Table singleLine sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={this.isSorted('name')} onClick={this.handleSort('name')}>
                名前
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('monthStart')} onClick={this.handleSort('monthStart')}>
                期間 (開始日 〜 終了日)
              </Table.HeaderCell>
              <Table.HeaderCell disabled/>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {
              okrPeriods.map(okrPeriod => {
                const id = okrPeriod.get('id');
                const name = okrPeriod.get('name');
                const monthStart = okrPeriod.get('monthStart');
                const monthEnd = okrPeriod.get('monthEnd');
                const disabled = id === okrPeriodId
                return (
                  <Table.Row key={id}>
                    <Table.Cell>
                      <AutoInput value={name} onCommit={this.handleNameCommit(id)}/>
                    </Table.Cell>
                    <Table.Cell>
                      <DatePicker dateFormat="YYYY/M/D" locale="ja" selected={moment(monthStart)} onChange={this.handleMonthStartChange(id)} />
                      <span className='between'>〜</span>
                      <DatePicker dateFormat="YYYY/M/D" locale="ja" selected={moment(monthEnd)} onChange={this.handleMonthEndChange(id)} />
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button icon="trash" onClick={this.handleRemoveClick(id, name)} content="削除する" negative disabled={disabled} />
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
  // container
  okrPeriods: ImmutablePropTypes.list.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  updateOkrPeriod: PropTypes.func.isRequired,
  removeOkrPeriod: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
};

OkrPeriodSettingTab.defaultProps = {
  key: 'okrPeriods',
}

export default OkrPeriodSettingTab;
