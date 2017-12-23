import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button } from 'semantic-ui-react';
import EditableText from './utils/EditableText';

class OrganizationSettingTab extends Component {
  changeLogoImage = (event) => {
    if (!event.target.files.length) { return; }
    this.props.openLogoImageModal(this.props.user.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  deleteLogo = (event) => {
    if (confirm('設定済みのアイコンを削除しますか？')) {
      this.props.deleteLogo({id: this.props.user.get('id'), removeLogo: true});
    }
  }
  render() {
    const user = this.props.user;
    const organization = this.props.organization;
    return (
      <Tab.Pane attached={false} className="organization-setting-tab">
        <dl>
          <dt>組織名</dt>
          <dd><EditableText value={organization.get('name')} saveValue={name => this.props.updateOrganization({id: user.get('id'), organizationName: name})}/></dd>
          <dt>ロゴ画像</dt>
          <dd>
            <div className="logo-img-button">
              <label className="file-button">
                <input type="file" style={{display: "none"}} onChange={this.changeLogoImage} />
              </label>
              <Button className="change-button" content="変更する" positive />
              {user.get('logoUrl') && <Button className="change-button" content="削除する" negative onClick={this.deleteLogo} />}
            </div>
          </dd>
        </dl>
      </Tab.Pane>
    );
  }
}

OrganizationSettingTab.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  updateOrganization: PropTypes.func,
  openLogoImageModal: PropTypes.func,
  deleteLogo: PropTypes.func
};

export default OrganizationSettingTab;
