import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Progress, Label, Popup } from 'semantic-ui-react'

class ProgressRate extends PureComponent {

  statusToText = status => {
    switch (status) {
      case 'green':
        return '順調'
      case 'yellow':
        return '注意'
      case 'red':
        return '危険'
      default:
        return status
    }
  }

  getProgressBar = () => {
    const { value, status } = this.props
    const className = `progress-rate__bar ${value < 50 ? 'lt50' : ''}`
    return <Progress progress className={className} percent={value} color={status || 'grey'} />
  }

  getProgressLabel = () => {
    const { value, status } = this.props
    return <Label className='progress-rate__label' content={`${value}%`} color={status || 'grey'} />
  }

  render() {
    const { status, type } = this.props
    const view = type === 'bar' ? this.getProgressBar() : this.getProgressLabel()
    if (!status) return view
    return (
      <Popup
        hoverable
        size='tiny'
        content={`見通しは${this.statusToText(status)}です`}
        trigger={view}
      />
    )
  }
}

ProgressRate.propTypes = {
  // container
  // component
  value: PropTypes.number.isRequired,
  status: PropTypes.string,
  type: PropTypes.string, // bar or label
}
ProgressRate.defaultProps = {
  status: null,
  type: 'bar',
}

export default ProgressRate
