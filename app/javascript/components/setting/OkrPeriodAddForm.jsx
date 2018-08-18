import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Form } from 'semantic-ui-react'
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
      <Form className="okr-period-add-form">
        <Form.Input
          inline
          label="名前"
          value={name}
          maxLength="255"
          placeholder="期間を表す名称など"
          onChange={this.handleNameChange}
        />

        <Form.Group inline>
          <label>期間</label>
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
        </Form.Group>

        <Form.Button
          icon="plus"
          content="追加する"
          onClick={this.handleAddClick}
        />
      </Form>
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
