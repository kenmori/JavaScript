import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import DefaultLayout from "../../../components/templates/DefaultLayout";
import Fetcher from "../../Fetcher";
import Dashboard from "../../Dashboard";
import KeyResultModal from "../../KeyResultModal";
import ObjectiveModal from "../../ObjectiveModal";
import OkrModal from "../../OkrModal";
import OptionModal from "../../OptionModal";

class Home extends PureComponent {
  componentDidMount() {
    const { userId, organizationId, organizationName } = this.props;

    if (userId && organizationId) {
      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
    }
  }

  componentDidUpdate() {
    const { userId, organizationId, organizationName } = this.props;

    if (userId && organizationId) {
      ReactGA.set({
        userId,
        dimension1: organizationId,
        dimension2: organizationName,
      });
    }
  }

  render() {
    return (
      <DefaultLayout title="ホーム">
        <div className="home">
          <Fetcher okrHash={this.props.okrHash} />
          <main>
            <Dashboard />
            <KeyResultModal />
            <ObjectiveModal />
            <OkrModal />
            <OptionModal />
          </main>
        </div>
      </DefaultLayout>
    );
  }
}

Home.propTypes = {
  // container
  okrHash: PropTypes.string,
  // component
};

export default Home;
