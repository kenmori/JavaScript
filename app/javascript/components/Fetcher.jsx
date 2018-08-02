import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Fetcher extends PureComponent {

  constructor(props) {
    super(props)
    if (props.okrHash) {
      this.props.openOkrModal(props.okrHash)
    }
  }

  componentDidMount() {
    if (!this.props.isFetchedOrganization) {
      this.props.fetchOrganization(this.props.organizationId)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFetchedOrganization && nextProps.isFetchedOrganization) {
      this.props.fetchOkrs(this.props.okrPeriodId, this.props.userId)
    }
    if (nextProps.okrHash) {
      if (!nextProps.isOpenOkrModal || this.props.okrHash !== nextProps.okrHash) {
        this.props.openOkrModal(nextProps.okrHash)
      }
    } else {
      if (nextProps.isOpenOkrModal) {
        this.props.closeOkrModal()
      }
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
  isOpenOkrModal: PropTypes.bool.isRequired,
  fetchOrganization: PropTypes.func.isRequired,
  fetchOkrs: PropTypes.func.isRequired,
  openOkrModal: PropTypes.func.isRequired,
  closeOkrModal: PropTypes.func.isRequired,
  // component
  okrHash: PropTypes.string,
}

export default Fetcher
