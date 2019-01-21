import React from "react";
import { Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import ReactGA from "react-ga";
import DocumentTitle from "react-document-title";
import Fetcher from "../../../containers/Fetcher";
import MenuBar from "../../../containers/MenuBar";
import AccountSettingTab from "../../../containers/AccountSettingTab";
import UserSettingTab from "../../../containers/UserSettingTab";
import OrganizationSettingTab from "../../../containers/OrganizationSettingTab";
import OkrPeriodSettingTab from "../../../containers/OkrPeriodSettingTab";
import ImageModal from "../../../containers/ImageModal";
import DefaultLayout from "../../templates/DefaultLayout";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panes: [
        {
          id: 0,
          menuItem: "アカウント",
          render: () => <AccountSettingTab />,
          name: "account",
        },
      ],
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.isAdmin !== nextProps.isAdmin) {
      const adminPanes = [
        {
          id: 1,
          menuItem: "組織",
          render: () => <OrganizationSettingTab />,
          name: "organization",
        },
        {
          id: 2,
          menuItem: "OKR 期間",
          render: () => <OkrPeriodSettingTab />,
          name: "okr_periods",
        },
        {
          id: 3,
          menuItem: "ユーザー",
          render: () => <UserSettingTab />,
          name: "users",
        },
      ];
      return {
        panes:
          nextProps.isAdmin && prevState.panes.length === 1
            ? prevState.panes.concat(adminPanes)
            : prevState.panes,
      };
    }

    return null;
  }

  handleTabChange = (event, { activeIndex }) => {
    const targetPane =
      this.state.panes.find(item => item.id === Number(activeIndex)) || {};
    this.props.changeURL(
      `/settings/${targetPane.name || this.state.panes[0].name}`,
    );
  };

  componentDidMount() {
    const { userId, organizationId, organizationName } = this.props;

    const targetPane = this.state.panes.find(
      item => item.name === this.props.name,
    );
    if (!targetPane) {
      return this.props.changeURL("/");
    }

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
    const targetPane = this.state.panes.find(
      pane => pane.name === this.props.name,
    );
    if (!targetPane) return null;

    return (
      <DefaultLayout>
        <DocumentTitle title={`${targetPane.menuItem} - 設定 - Resily`}>
          {this.renderBody(targetPane.id)}
        </DocumentTitle>
      </DefaultLayout>
    );
  }

  renderBody(activeIndex) {
    return (
      <div className="settings-page">
        <Fetcher />
        <MenuBar />
        <main>
          <Tab
            activeIndex={activeIndex}
            panes={this.state.panes}
            className="setting-tabs"
            onTabChange={this.handleTabChange}
          />
        </main>
        <ImageModal />
      </div>
    );
  }
}

Settings.propTypes = {
  // container
  name: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  changeURL: PropTypes.func.isRequired,
  // component
};

Settings.defaultProps = {
  name: "account",
};

export default Settings;
