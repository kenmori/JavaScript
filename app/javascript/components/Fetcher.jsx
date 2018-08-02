import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Fetcher extends PureComponent {

  componentDidMount() {
    if (!this.props.isFetchedOrganization) {
      this.props.fetchOrganization(this.props.organizationId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFetchedOrganization && nextProps.isFetchedOrganization) {
      this.props.fetchOkrs(this.props.okrPeriodId, this.props.userId)
    }
  }

  render() {
    return null
  }
}

Fetcher.propTypes = {
  // container
  organizationId: PropTypes.number.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  isFetchedOrganization: PropTypes.bool.isRequired,
  fetchOrganization: PropTypes.func.isRequired,
  fetchOkrs: PropTypes.func.isRequired,
  // component
}

export default Fetcher
