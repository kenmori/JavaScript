import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Progress, Popup } from 'semantic-ui-react'

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

  getProgressView = () => {
    const { value, status, size } = this.props
    const className = `progress-rate ${value < 50 ? 'lt50' : ''}`
    return <Progress progress className={className} percent={value} size={size} color={status} />
  }

  render() {
    const { status } = this.props
    const view = this.getProgressView()
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
  size: PropTypes.string,
}
ProgressRate.defaultProps = {
  status: null,
  size: null,
}

export default ProgressRate
