import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Icon } from 'semantic-ui-react'

class Status extends PureComponent {

  render() {
    const { value, size, showGreen } = this.props
    if (value === 'green' && !showGreen) {
      return null
    }
    return (
      <Icon className="status" circular inverted fitted size={size} color={value} />
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
