import React, { PureComponent } from "react";
import { List } from "immutable";
import DefaultLayout from "../../templates/DefaultLayout";
import OkrModal from "../../../containers/OkrModal";
import HistoryTimeline from "../../molecules/HistoryTimeline";

class Timeline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isFetchedOKR: false };
  }

  selectHistories(keyResults) {
    return keyResults
      .map(e => {
        const histories = e.get("histories") || List();
        return histories.map(h => h.set("KeyResult", e));
      })
      .flatten(true)
      .sort((a, b) => {
        if (a.get("createdAt") < b.get("createdAt")) {
          return 1;
        }
        if (a.get("createdAt") > b.get("createdAt")) {
          return -1;
        }
        if (a.get("createdAt") === b.get("createdAt")) {
          return 0;
        }
      });
  }

  componentDidMount() {
    const {
      isFetchedMyDetail,
      isFetchedKeyResultsCommentLabels,
      isFetchedKeyResults,
      fetchMyDetail,
      fetchKeyResultCommentLabels,
      keyResults,
      fetchKeyResultHistory,
    } = this.props;

    if (!isFetchedMyDetail) {
      fetchMyDetail();
    }
    if (!isFetchedKeyResultsCommentLabels) {
      fetchKeyResultCommentLabels();
    }
    if (isFetchedKeyResults) {
      keyResults.map(e => fetchKeyResultHistory(e.get("id")));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      isFetchedMyDetail,
      isFetchedKeyResults,
      fetchOKR,
      keyResults,
      okrPeriodId,
      userId,
      fetchKeyResultHistory,
    } = this.props;

    if (isFetchedMyDetail && !isFetchedKeyResults && !this.state.isFetchedOKR) {
      fetchOKR(okrPeriodId, userId);
      this.setState({ isFetchedOKR: true });
    }

    if (!prevProps.isFetchedKeyResults && isFetchedKeyResults) {
      keyResults.map(e => fetchKeyResultHistory(e.get("id")));
    }
  }

  render() {
    const { keyResults, okrPeriod, user, openOkrModal } = this.props;
    const okrPeriodName = okrPeriod ? okrPeriod.get("name") : "";
    const userName = user
      ? `${user.get("lastName")} ${user.get("firstName")}`
      : "";

    return (
      <DefaultLayout title="タイムライン">
        <HistoryTimeline
          histories={this.selectHistories(keyResults)}
          okrPeriodName={okrPeriodName}
          userName={userName}
          handleClick={openOkrModal}
        />
        <OkrModal extensionEnabled={false} />
      </DefaultLayout>
    );
  }
}
export default Timeline;
