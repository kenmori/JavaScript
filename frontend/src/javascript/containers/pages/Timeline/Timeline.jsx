import React, { PureComponent } from "react";
import { List } from "immutable";
import moment from "moment";
import DefaultLayout from "../../../components/templates/DefaultLayout";
import OkrModal from "../../OkrModal";
import HistoryTimeline from "../../../components/organisms/HistoryTimeline";
import NotUpdatedKeyResultList from "../../../components/organisms/NotUpdatedKeyResultList";
import { isWithinAWeek } from "../../../utils/date";

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

  selectNotUpdatedKeyResults(keyResults) {
    return keyResults
      .filter(e => !isWithinAWeek(moment(e.get("updatedAt"))))
      .sort((a, b) => {
        if (a.get("updatedAt") < b.get("updatedAt")) {
          return -1;
        }
        if (a.get("updatedAt") > b.get("updatedAt")) {
          return 1;
        }
        if (a.get("updatedAt") === b.get("updatedAt")) {
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
    const { keyResults, okrPeriod, user, openOkrModal, openObjectiveCommentModal } = this.props;
    const okrPeriodName = okrPeriod ? okrPeriod.get("name") : "";
    const userName = user
      ? `${user.get("lastName")} ${user.get("firstName")}`
      : "";

    return (
      <DefaultLayout title="タイムライン">
        <div className="widget">
          <NotUpdatedKeyResultList
            keyResults={this.selectNotUpdatedKeyResults(keyResults)}
            okrPeriodName={okrPeriodName}
            userName={userName}
          />
        </div>
        <div className="widget">
          <HistoryTimeline
            histories={this.selectHistories(keyResults)}
            okrPeriodName={okrPeriodName}
            userName={userName}
            handleClick={openOkrModal}
          />
        </div>
        <OkrModal extensionEnabled={false} />
      </DefaultLayout>
    );
  }
}
export default Timeline;
