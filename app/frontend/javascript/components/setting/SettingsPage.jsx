import React, { PureComponent } from "react";
import { Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import DocumentTitle from "react-document-title";
import Fetcher from "../../containers/Fetcher";
import MenuBar from "../../containers/MenuBar";
import AccountSettingTab from "../../containers/AccountSettingTab";
import UserSettingTab from "../../containers/UserSettingTab";
import OrganizationSettingTab from "../../containers/OrganizationSettingTab";
import OkrPeriodSettingTab from "../../containers/OkrPeriodSettingTab";
import ImageModal from "../../containers/ImageModal";

class SettingsPage extends PureComponent {
  constructor(props) {
    super(props);
    const panes = [
      {
        id: 0,
        menuItem: "アカウント",
        render: () => <AccountSettingTab />,
        name: "account",
      },
    ];
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
    this.panes = this.props.isAdmin ? panes.concat(adminPanes) : panes;
  }

  handleTabChange = (event, { activeIndex }) => {
    const targetPane =
      this.panes.find(item => item.id === Number(activeIndex)) || {};
    this.props.changeURL(`/settings/${targetPane.name || this.panes[0].name}`);
  };

  componentWillMount() {
    const targetPane = this.panes.find(item => item.name === this.props.name);
    if (!targetPane) {
      return this.props.changeURL("/");
    }
  }

  render() {
    const targetPane = this.panes.find(pane => pane.name === this.props.name);
    if (!targetPane) return null;
    return (
      <DocumentTitle title={`${targetPane.menuItem} - 設定 - Resily`}>
        {this.renderBody(targetPane.id)}
      </DocumentTitle>
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
            panes={this.panes}
            className="setting-tabs"
            onTabChange={this.handleTabChange}
          />
        </main>
        <ImageModal />
      </div>
    );
  }
}

SettingsPage.propTypes = {
  // container
  name: PropTypes.string,
  isAdmin: PropTypes.bool.isRequired,
  changeURL: PropTypes.func.isRequired,
  // component
};

SettingsPage.defaultProps = {
  name: "account",
};

export default SettingsPage;
