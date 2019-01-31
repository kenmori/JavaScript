import React, { PureComponent } from "react";
import { Header } from "semantic-ui-react";
import ReactGA from "react-ga";
import DefaultLayout from "../../../components/templates/DefaultLayout";
import OkrModal from "../../OkrModal";
import HistoryTimeline from "../../../components/organisms/HistoryTimeline";
import OwnerShipKeyResultList from "../../../components/organisms/OwnerShipKeyResultList";

class Timeline extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { isFetchedOKR: false };
  }

  componentDidMount() {
    const {
      userId,
      organizationId,
      organizationName,
      isFetchedMyDetail,
      isFetchedKeyResultsCommentLabels,
      isFetchedKeyResults,
      isFetchedObjectives,
      fetchMyDetail,
      fetchKeyResultCommentLabels,
      keyResults,
      objectives,
      fetchKeyResultHistory,
      fetchObjective,
    } = this.props;

    if (!isFetchedMyDetail) {
      fetchMyDetail();
    }
    if (!isFetchedKeyResultsCommentLabels) {
      fetchKeyResultCommentLabels();
    }
    if (isFetchedKeyResults) {
      keyResults.forEach(e => fetchKeyResultHistory(e.get("id")));
    }
    if (isFetchedObjectives && isFetchedKeyResults) {
      keyResults.forEach(e => {
        if (!objectives.find(o => o.get("id") === e.get("objectiveId"))) {
          fetchObjective(e.get("objectiveId"));
        }
      });
    }

    if (userId && organizationId) {
      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const {
      userId,
      organizationId,
      organizationName,
      isFetchedMyDetail,
      isFetchedKeyResults,
      isFetchedObjectives,
      fetchOKR,
      keyResults,
      objectives,
      okrPeriodId,
      fetchKeyResultHistory,
      fetchObjective,
    } = this.props;

    if (isFetchedMyDetail && !isFetchedKeyResults && !this.state.isFetchedOKR) {
      fetchOKR(okrPeriodId, userId);
      this.setState({ isFetchedOKR: true });
    }

    if (!prevProps.isFetchedKeyResults && isFetchedKeyResults) {
      keyResults.forEach(e => fetchKeyResultHistory(e.get("id")));
    }
    if (
      !prevProps.isFetchedObjectives &&
      isFetchedObjectives &&
      isFetchedKeyResults
    ) {
      keyResults.forEach(e => {
        if (!objectives.find(o => o.get("id") === e.get("objectiveId"))) {
          fetchObjective(e.get("objectiveId"));
        }
      });
    }

    if (userId && organizationId) {
      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
    }
  }

  render() {
    const {
      sortedKeyResults,
      histories,
      okrPeriod,
      user,
      objectives,
      openOkrModal,
    } = this.props;
    const okrPeriodName = okrPeriod ? okrPeriod.get("name") : "";
    const userName = user
      ? `${user.get("lastName")} ${user.get("firstName")}`
      : "";

    return (
      <DefaultLayout title="タイムライン">
        <Header
          as="h4"
          className="timeline__header"
          dividing
          content={`${okrPeriodName} ${userName}さんのタイムライン`}
        />
        <div className="widget">
          <OwnerShipKeyResultList
            keyResults={sortedKeyResults}
            objectives={objectives}
            openOkrModal={openOkrModal}
          />
        </div>
        <div className="widget">
          <HistoryTimeline histories={histories} handleClick={openOkrModal} />
        </div>
        <OkrModal extensionEnabled={false} />
      </DefaultLayout>
    );
  }
}
export default Timeline;
