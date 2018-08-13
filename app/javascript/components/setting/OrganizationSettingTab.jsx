import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Button } from 'semantic-ui-react';
import AutoInput from '../form/AutoInput';
import OkrSpanSelect from '../form/OkrSpanSelect'
import Logo from '../util/Logo';

class OrganizationSettingTab extends PureComponent {
  changeLogoImage = (event) => {
    if (!event.target.files.length) { return; }
    this.props.openLogoModal(this.props.organization.get('id'), event.target.files[0]);
    event.target.value = null;
  }

  clickFileInput = () => this.refs.fileInput.click()

  deleteLogo = () => {
    this.props.confirm({
      content: '設定済みのロゴを削除しますか？',
      onConfirm: () => this.props.deleteLogo(this.props.organization.get('id')),
    });
  }

  handleNameCommit = name => this.props.updateOrganization({id: this.props.organization.get('id'), name})

  handleOkrSpanChange = okrSpan => {
    const { organization } = this.props
    if (okrSpan !== organization.get('okrSpan')) {
      this.props.updateOrganization({ id: organization.get('id'), okrSpan })
    }
  }

  render() {
    const organization = this.props.organization;
    const path = organization.get('logo').get('url');
    const okrSpan = organization.get('okrSpan');
    return (
      <Tab.Pane className="organization-setting-tab">
        <dl>
          <dt>組織名</dt>
          <dd><AutoInput value={organization.get('name')} placeholder='会社名やチーム名など' onCommit={this.handleNameCommit}/></dd>
          <dt>OKR 周期</dt>
          <dd><OkrSpanSelect value={okrSpan} onChange={this.handleOkrSpanChange} /></dd>
          <dt>ロゴ</dt>
          <dd><Logo path={path} /></dd>
          <dd>
            <input type="file" className="file-input" ref="fileInput" onChange={this.changeLogoImage} />
            <Button content="変更する" positive onClick={this.clickFileInput} />
            {path && <Button content="削除する" negative onClick={this.deleteLogo} />}
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
