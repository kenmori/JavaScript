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

  render() {
    const { value, status, size } = this.props
    const statusText = this.statusToText(status)
    return (
      <Popup
        hoverable
        size='tiny'
        content={`見通しは${statusText}です`}
        trigger={<Progress progress className='progress-rate' percent={value} size={size} color={status} />}
      />
    )
  }
}

ProgressRate.propTypes = {
  // container
  // component
  value: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  size: PropTypes.string,
}
ProgressRate.defaultProps = {
  size: null,
}

export default ProgressRate
