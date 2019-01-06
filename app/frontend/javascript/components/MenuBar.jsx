import React, { PureComponent } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Dropdown, Menu, Icon } from "semantic-ui-react";
import UserAvatar from "../containers/UserAvatar";
import UserSelect from "./form/UserSelect";
import OkrPeriodSelect from "./form/OkrPeriodSelect";
import Logo from "./util/Logo";

class MenuBar extends PureComponent {
  userTrigger = loginUser => {
    if (!this.props.isFetchedMyDetail) {
      return;
    }

    return (
      <UserAvatar user={loginUser} size="tiny" withInitial={false} withName />
    );
  };

  handleOrganizationOkrClick = () => this.props.selectUser(this.props.ownerId);

  render() {
    return (
      <Menu secondary className="menu-bar">
        <Menu.Item header href="/">
          <Logo
            path={this.props.organization.getIn(["logo", "url"])}
            size="tiny"
          />
        </Menu.Item>
        <Menu.Item className="menu-item__home" href="/">
          <Icon name="home" size="large" fitted />
          ホーム
        </Menu.Item>
        <Menu.Item
          className="menu-item__okr"
          onClick={this.handleOrganizationOkrClick}>
          <Icon name="building" size="large" fitted />
          組織 OKR
        </Menu.Item>
        <Menu.Item fitted="horizontally">
          <OkrPeriodSelect
            okrPeriods={this.props.okrPeriods}
            value={this.props.okrPeriodId}
            onChange={this.props.selectOkrPeriod}
          />
        </Menu.Item>
        <Menu.Item fitted="horizontally">
          <UserSelect
            users={this.props.users}
            value={this.props.userId}
            onChange={this.props.selectUser}
          />
        </Menu.Item>
        <Menu.Item position="right">
          <Dropdown
            trigger={this.userTrigger(this.props.loginUser)}
            pointing="top right">
            <Dropdown.Menu>
              <Dropdown.Item
                as={Link}
                to="/settings/account"
                icon="setting"
                text="設定"
              />
              <Dropdown.Item
                as="a"
                href="https://help.resily.com/"
                target="_blank"
                icon="help circle"
                text="ヘルプ"
              />
              <Dropdown.Item
                onClick={this.props.signOut}
                icon="sign out"
                text="ログアウト"
              />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );
  }
}

MenuBar.propTypes = {
  // container
  ownerId: PropTypes.number.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  okrPeriods: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  organization: ImmutablePropTypes.map.isRequired,
  loginUser: ImmutablePropTypes.map.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectOkrPeriod: PropTypes.func.isRequired,
  signOut: PropTypes.func.isRequired,
  // component
};

export default MenuBar;
