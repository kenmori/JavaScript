import { PureComponent } from "react";
import PropTypes from "prop-types";

class Fetcher extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isFetchedOkrs: false };
    if (props.okrHash) {
      this.props.openOkrModal(props.okrHash);
    }
  }

  componentDidMount() {
    const { isFetchedMyDetail, fetchMyDetail, isFetchedKeyResultsCommentLabels, fetchKeyResultCommentLabels } = this.props;

    if (!isFetchedMyDetail) {
      fetchMyDetail();
    }

    // 現状ユーザアクションで更新されないマスタデータなので初回訪問時のみfetchしている
    if (!isFetchedKeyResultsCommentLabels) {
      fetchKeyResultCommentLabels();
    }
  }

  componentDidUpdate() {
    const { isFetchedMyDetail, fetchOkrs, okrPeriodId, userId } = this.props;

    if (isFetchedMyDetail && !this.state.isFetchedOkrs) {
      fetchOkrs(okrPeriodId, userId);
      this.setState({ isFetchedOkrs: true });
    }
  }

  componentWillReceiveProps(nextProps) {
    // 設定画面からの遷移時はisFetchedOrganizationを見てmodalを出す
    if (this.state.isFetchedOkrs || this.props.isFetchedOrganization) {
      if (nextProps.okrHash) {
        if (
          !nextProps.isOpenOkrModal ||
          this.props.okrHash !== nextProps.okrHash
        ) {
          this.props.openOkrModal(nextProps.okrHash);
        }
      } else if (nextProps.isOpenOkrModal) {
        this.props.closeOkrModal();
      }
    } else if (nextProps.isFetchedOrganization) {
      if (nextProps.okrHash) {
        if (nextProps.isOpenOkrModal) {
          this.props.selectOkrPeriod(nextProps.okrHash);
          this.setState({ isFetchedOkrs: true });
        }
      }
    }
  }

  render() {
    return null;
  }
}

Fetcher.propTypes = {
  // container
  isFetchedMyDetail: PropTypes.bool.isRequired,
  okrPeriodId: PropTypes.number,
  userId: PropTypes.number,
  isFetchedKeyResultsCommentLabels: PropTypes.bool.isRequired,
  isFetchedObjectiveCommentLabels: PropTypes.bool.isRequired,
  isOpenOkrModal: PropTypes.bool.isRequired,
  fetchOkrs: PropTypes.func.isRequired,
  fetchKeyResultCommentLabels: PropTypes.func.isRequired,
  fetchObjectiveCommentLabels: PropTypes.func.isRequired,
  selectOkrPeriod: PropTypes.func.isRequired,
  openOkrModal: PropTypes.func.isRequired,
  closeOkrModal: PropTypes.func.isRequired,
  // component
  okrHash: PropTypes.string,
};

export default Fetcher;
