import React from "react";
import { Tab } from "semantic-ui-react";
import PropTypes from "prop-types";
import DefaultLayout from "../../layouts/DefaultLayout";
import AccountSettingTab from "../../../containers/organisms/AccountSettingTab";
import UserSettingTab from "../../../containers/organisms/UserSettingTab";
import OrganizationSettingTab from "../../../containers/organisms/OrganizationSettingTab";
import OkrPeriodSettingTab from "../../../containers/organisms/OkrPeriodSettingTab";
import AppSettingTab from "../../../containers/organisms/AppSettingTab";
import ImageModal from "../../../containers/ImageModal";

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
        }
      ];
      // TODO: Feature Toggle無いので仕方なく...
      if (nextProps.organization.get("id") === 2 || nextProps.organization.get("id") === 137) {
        adminPanes.push({
          id: 4,
          menuItem: "アプリケーション",
          render: () => <AppSettingTab />,
          name: "applications",
        });
      }

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
    const { fetchOkrs, okrPeriodId, userId } = this.props;

    const targetPane = this.state.panes.find(
      item => item.name === this.props.name,
    );
    if (!targetPane) {
      return this.props.changeURL("/");
    }

    fetchOkrs(okrPeriodId, userId);
  }

  render() {
    const targetPane = this.state.panes.find(
      pane => pane.name === this.props.name,
    );
    if (!targetPane) return null;

    return (
      <DefaultLayout title={`${targetPane.menuItem} - 設定`}>
        <div className="settings-page">
          <main>
            <Tab
              activeIndex={targetPane.id}
              panes={this.state.panes}
              className="setting-tabs"
              onTabChange={this.handleTabChange}
            />
          </main>
          <ImageModal />
        </div>
      </DefaultLayout>
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
