import React, { PureComponent } from "react";
import { Header } from "semantic-ui-react";
import ReactGA from "react-ga";
import DefaultLayout from "../../../components/templates/DefaultLayout";
import OkrModal from "../../OkrModal";
import ObjectiveCommentModal from "../../ObjectiveCommentModal";
import HistoryTimeline from "../../../components/organisms/HistoryTimeline";
import NotUpdatedKeyResultList from "../../../components/organisms/NotUpdatedKeyResultList";

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
      fetchOKR,
      keyResults,
      okrPeriodId,
      fetchKeyResultHistory,
    } = this.props;

    if (isFetchedMyDetail && !isFetchedKeyResults && !this.state.isFetchedOKR) {
      fetchOKR(okrPeriodId, userId);
      this.setState({ isFetchedOKR: true });
    }

    if (!prevProps.isFetchedKeyResults && isFetchedKeyResults) {
      keyResults.map(e => fetchKeyResultHistory(e.get("id")));
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
      notUpdatedKeyResults,
      histories,
      okrPeriod,
      user,
      objectiveName,
      objectiveId,
      objectiveComments,
      fetchObjective,
      openObjectiveCommentModal,
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
          <NotUpdatedKeyResultList
            keyResults={notUpdatedKeyResults}
            fetchObjective={fetchObjective}
            openObjectiveCommentModal={openObjectiveCommentModal}
          />
        </div>
        <div className="widget">
          <HistoryTimeline histories={histories} handleClick={openOkrModal} />
        </div>
        <OkrModal extensionEnabled={false} />
        <ObjectiveCommentModal
          title={objectiveName}
          objectiveId={objectiveId}
          comments={objectiveComments}
        />
      </DefaultLayout>
    );
  }
}
export default Timeline;
