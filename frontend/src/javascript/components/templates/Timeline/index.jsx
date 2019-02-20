import React, { PureComponent } from "react";
import { Header } from "semantic-ui-react";
import DefaultLayout from "../../layouts/DefaultLayout";
import OKRModal from "../../../containers/organisms/OKRModal";
import HistoryTimeline from "../../organisms/HistoryTimeline";
import OwnerShipKeyResultList from "../../organisms/OwnerShipKeyResultList";

class Timeline extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { userId, okrPeriodId, fetchOKR } = this.props;

    fetchOKR(okrPeriodId, userId);
  }

  componentDidUpdate(prevProps) {
    const {
      isFetchedKeyResults,
      objectives,
      keyResults,
      fetchKeyResultHistories,
      fetchObjectivesDetail,
    } = this.props;

    if (!prevProps.isFetchedKeyResults && isFetchedKeyResults) {
      const keyResultIds = new Set();
      const objectiveIds = new Set();
      keyResults.map(e => {
        keyResultIds.add(e.get("id"));
        if (!objectives.find(o => o.get("id") === e.get("objectiveId"))) {
          objectiveIds.add(e.get("objectiveId"));
        }
      });
      fetchKeyResultHistories([...keyResultIds]);
      fetchObjectivesDetail([...objectiveIds]);
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
        <OKRModal />
      </DefaultLayout>
    );
  }
}
export default Timeline;
