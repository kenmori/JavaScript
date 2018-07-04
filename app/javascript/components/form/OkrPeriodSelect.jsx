import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Dropdown } from 'semantic-ui-react'

class OkrPeriodSelect extends PureComponent {

  okrPeriodsOptions = okrPeriods => {
    return okrPeriods.map(okrPeriod => ({
      key: okrPeriod.get('id'),
      value: okrPeriod.get('id'),
      text: okrPeriod.get('name'),
    })).toArray()
  }

  handleChange = (e, { value }) => {
    this.props.onChange(value)
  }

  render() {
    const { okrPeriods, value } = this.props
    return (
      <Dropdown
        scrolling
        pointing="top"
        options={this.okrPeriodsOptions(okrPeriods)}
        defaultValue={value}
        onChange={this.handleChange}
        selectOnNavigation={false}
      />
    )
  }
}

OkrPeriodSelect.propTypes = {
  // container
  // component
  okrPeriods: ImmutablePropTypes.list.isRequired,
  value: PropTypes.number,
  onChange: PropTypes.func.isRequired,
}

export default OkrPeriodSelect
