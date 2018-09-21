import { PureComponent } from 'react'
import PropTypes from 'prop-types'

class Fetcher extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { isFetchedOkrs: false }
    if (props.okrHash) {
      this.props.openOkrModal(props.okrHash)
    }
  }

  componentDidMount() {
    if (!this.props.isFetchedOrganization) {
      this.props.fetchOrganization(this.props.organizationId)
    }

    // 現状ユーザアクションで更新されないマスタデータなので初回訪問時のみfetchしている
    if (!this.props.isFetchedKeyResultsCommentLabels) {
      this.props.fetchKeyResultCommentLabels()
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.isFetchedOkrs) {
      if (nextProps.okrHash) {
        if (!nextProps.isOpenOkrModal || this.props.okrHash !== nextProps.okrHash) {
          this.props.openOkrModal(nextProps.okrHash)
        }
      } else {
        if (nextProps.isOpenOkrModal) {
          this.props.closeOkrModal()
        }
      }
    } else {
      if (nextProps.isFetchedOrganization) {
        if (nextProps.okrHash) {
          if (nextProps.isOpenOkrModal) {
            this.props.selectOkrPeriod(nextProps.okrHash)
            this.setState({ isFetchedOkrs: true })
          }
        } else {
          this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId)
          this.setState({ isFetchedOkrs: true })
        }
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
  isFetchedKeyResultsCommentLabels: PropTypes.bool.isRequired,
  isOpenOkrModal: PropTypes.bool.isRequired,
  fetchOrganization: PropTypes.func.isRequired,
  fetchOkrs: PropTypes.func.isRequired,
  fetchKeyResultCommentLabels: PropTypes.func.isRequired,
  selectOkrPeriod: PropTypes.func.isRequired,
  openOkrModal: PropTypes.func.isRequired,
  closeOkrModal: PropTypes.func.isRequired,
  // component
  okrHash: PropTypes.string,
}

export default Fetcher
