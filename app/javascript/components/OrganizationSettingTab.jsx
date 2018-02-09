import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'semantic-ui-react';
import AutoInput from './utils/AutoInput';
import Logo from './Logo';

class OrganizationSettingTab extends Component {
  changeLogoImage = (event) => {
    if (!event.target.files.length) { return; }
    this.props.openLogoImageModal(this.props.organization.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  deleteLogo = (event) => {
    this.props.confirm({
      content: '設定済みのロゴを削除しますか？',
      onConfirm: () => this.props.deleteLogo({id: this.props.organization.get('id'), removeLogo: true}),
    });
  }
  render() {
    const organization = this.props.organization;
    const path = organization.get('logo').get('url');
    return (
      <Tab.Pane attached={false} className="organization-setting-tab">
        <dl>
          <dt>組織名</dt>
          <dd><AutoInput value={organization.get('name')} placeholder='会社名やチーム名など' onCommit={name => this.props.updateOrganization({id: organization.get('id'), name})}/></dd>
          <dt>ロゴ</dt>
          <dd>
            <Logo path={path} />
            <div className="logo-img-button">
              <label className="file-button">
                <input type="file" style={{display: "none"}} onChange={this.changeLogoImage} />
              </label>
              <Button className="change-button" content="変更する" positive />
              {path && <Button className="change-button" content="削除する" negative onClick={this.deleteLogo} />}
            </div>
          </dd>
        </dl>
      </Tab.Pane>
    );
  }
}

OrganizationSettingTab.propTypes = {
  organization: PropTypes.object,
  updateOrganization: PropTypes.func,
  openLogoImageModal: PropTypes.func,
  deleteLogo: PropTypes.func
};

export default OrganizationSettingTab;
