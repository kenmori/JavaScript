import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Button, Select } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import Logo from '../util/Logo';

class OrganizationSettingTab extends PureComponent {
  changeLogoImage = (event) => {
    if (!event.target.files.length) { return; }
    this.props.openLogoModal(this.props.organization.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  deleteLogo = (event) => {
    this.props.confirm({
      content: '設定済みのロゴを削除しますか？',
      onConfirm: () => this.props.deleteLogo({id: this.props.organization.get('id'), removeLogo: true}),
    });
  }

  handleNameCommit = name => this.props.updateOrganization({id: this.props.organization.get('id'), name})

  handleOkrSpanCommit = (event, data) => {
    const okrSpan = data.value;
    const organization = this.props.organization;
    const id = organization.get('id');
    const originOkrSpan = organization.get('okrSpan');

    if (okrSpan !== originOkrSpan) {
      this.props.updateOrganization({id, okrSpan})
    }
  }

  render() {
    const organization = this.props.organization;
    const path = organization.get('logo').get('url');
    const okrSpan = organization.get('okrSpan');
    return (
      <Tab.Pane attached={false} className="organization-setting-tab">
        <dl>
          <dt>組織名</dt>
          <dd><AutoInput value={organization.get('name')} placeholder='会社名やチーム名など' onCommit={this.handleNameCommit}/></dd>
          <dt>OKR 周期</dt>
          <dd>
            <Select
              defaultValue={okrSpan}
              options={[
                { key: 1, value: 1, text: '1ヶ月間' },	
                { key: 3, value: 3, text: '3ヶ月間' },	
                { key: 6, value: 6, text: '半年間' },	
                { key: 12, value: 12, text: '1年間' }
              ]}
              onChange={this.handleOkrSpanCommit}
            />
          </dd>
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
  // container
  organization: ImmutablePropTypes.map.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  openLogoModal: PropTypes.func.isRequired,
  deleteLogo: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
};

export default OrganizationSettingTab;
