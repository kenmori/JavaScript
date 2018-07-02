import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Table, Button, Input } from 'semantic-ui-react'
import DatePicker from '../form/DatePicker'
import moment from 'moment/moment'
import ImmutablePropTypes from 'react-immutable-proptypes'

class OkrPeriodAddForm extends PureComponent {

  constructor(props) {
    super(props)
    const monthStart = this.calcMonthStart(props.okrPeriods)
    const monthEnd = this.calcMonthEnd(monthStart)
    this.state = { name: '', monthStart, monthEnd }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.okrPeriods !== nextProps.okrPeriods) {
      const monthStart = this.calcMonthStart(nextProps.okrPeriods)
      const monthEnd = this.calcMonthEnd(monthStart)
      this.setState({ monthStart, monthEnd })
    }
  }

  calcMonthStart(okrPeriods) {
    const endDate = okrPeriods.map(okrPeriod => okrPeriod.get('monthEnd')).sort().last()
    return moment(endDate).add(1, 'day')
  }

  calcMonthEnd(monthStart) {
    return monthStart.clone().add(this.props.okrSpan, 'month').subtract(1, 'day')
  }

  handleNameChange = (e, { value }) => this.setState({ name: value })

  handleMonthStartChange = date => this.setState({ monthStart: date })

  handleMonthEndChange = date => this.setState({ monthEnd: date })

  handleAddClick = () => {
    const { organizationId } = this.props
    const { name, monthStart, monthEnd } = this.state
    this.props.addOkrPeriod({
      name,
      monthStart: monthStart.format('YYYY-MM-DD'),
      monthEnd: monthEnd.format('YYYY-MM-DD'),
      organizationId,
    })
  }

  render() {
    const { name, monthStart, monthEnd } = this.state
    return (
      <Table>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              <Input
                value={name}
                maxLength="255"
                placeholder="期間名"
                onChange={this.handleNameChange}
              />
            </Table.Cell>
            <Table.Cell>
              <DatePicker
                dateFormat="YYYY/M/D"
                selected={monthStart}
                locale="ja"
                onChange={this.handleMonthStartChange}
              />
              <span className='between'>〜</span>
              <DatePicker
                dateFormat="YYYY/M/D"
                selected={monthEnd}
                locale="ja"
                onChange={this.handleMonthEndChange}
              />
            </Table.Cell>
            <Table.Cell textAlign="center">
              <Button
                icon="plus"
                content="追加する"
                onClick={this.handleAddClick}
              />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    )
  }
}

OkrPeriodAddForm.propTypes = {
  // container
  organizationId: PropTypes.number.isRequired,
  okrSpan: PropTypes.number.isRequired,
  okrPeriods: ImmutablePropTypes.list.isRequired,
  addOkrPeriod: PropTypes.func.isRequired,
  // component
}

export default OkrPeriodAddForm
