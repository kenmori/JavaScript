import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon, Popup } from 'semantic-ui-react'

class Status extends PureComponent {

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
    const { value, size, showGreen } = this.props
    if (value === 'green' && !showGreen) {
      return null
    }
    const statusText = this.statusToText(value)
    return (
      <Popup
        hoverable
        size='tiny'
        content={`見通しは${statusText}です`}
        trigger={<Icon className="status" circular inverted size={size} color={value} />}
      />
    )
  }
}

Status.propTypes = {
  // container
  // component
  value: PropTypes.string.isRequired,
  size: PropTypes.string,
  showGreen: PropTypes.bool,
}
Status.defaultProps = {
  size: 'small',
  showGreen: false,
}

export default Status
