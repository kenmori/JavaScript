import React, { PureComponent } from "react";
import DefaultLayout from "../../../components/templates/DefaultLayout";
import Dashboard from "../../Dashboard";
import KeyResultModal from "../../KeyResultModal";
import ObjectiveModal from "../../ObjectiveModal";
import OKRModal from "../../organisms/OKRModal";
import OptionModal from "../../OptionModal";

class Home extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {
      fetchOkrs,
      okrPeriodId,
      userId,
      isModal,
      objectiveId,
      keyResultId,
      openOkrModal,
    } = this.props;

    fetchOkrs(okrPeriodId, userId);
    if (isModal) {
      openOkrModal(objectiveId, keyResultId);
    }
  }

  render() {
    return (
      <DefaultLayout title="ホーム">
        <div className="home">
          <Dashboard />
          <KeyResultModal />
          <ObjectiveModal />
          <OKRModal />
          <OptionModal />
        </div>
      </DefaultLayout>
    );
  }
}
export default Home;
