import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Button } from 'semantic-ui-react'
import AutoInput from '../form/AutoInput'
import OkrSpanSelect from '../form/OkrSpanSelect'
import OkrPeriodSelect from '../form/OkrPeriodSelect'
import Logo from '../util/Logo'

class OrganizationSettingTab extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { okrPeriodId: props.okrPeriodId }
  }

  changeLogoImage = (event) => {
    if (!event.target.files.length) { return }
    this.props.openLogoModal(this.props.organization.get('id'), event.target.files[0])
    event.target.value = null
  }

  clickFileInput = () => this.refs.fileInput.click()

  deleteLogo = () => {
    this.props.confirm({
      content: '設定済みのロゴを削除しますか？',
      onConfirm: () => this.props.deleteLogo(this.props.organization.get('id')),
    })
  }

  handleNameCommit = name => this.props.updateOrganization({id: this.props.organization.get('id'), name})

  handleOkrSpanChange = okrSpan => {
    const { organization } = this.props
    if (okrSpan !== organization.get('okrSpan')) {
      this.props.updateOrganization({ id: organization.get('id'), okrSpan })
    }
  }

  handleOkrPeriodChange = okrPeriodId => this.setState({ okrPeriodId })

  handleExportClick = () => {
    const { okrPeriods, confirm } = this.props
    const { okrPeriodId } = this.state
    const okrPeriod = okrPeriods.find(okrPeriod => okrPeriod.get('id') === okrPeriodId)
    const okrPeriodName = `${okrPeriod.get('name')} (${okrPeriod.get('startDate')} 〜 ${okrPeriod.get('endDate')})`
    confirm({
      content: `OKR 期間 "${okrPeriodName}" に属する OKR 一覧をエクスポートしますか？エクスポートされたデータは CSV 形式のファイルとしてダウンロードされます。`,
      onConfirm: () => this.refs.downloadLink.click(),
    })
  }

  render() {
    const { organization, okrPeriods } = this.props
    const { okrPeriodId } = this.state
    const path = organization.get('logo').get('url')
    const okrSpan = organization.get('okrSpan')
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

        <dl>
          <dt>OKR エクスポート</dt>
          <dd>
            <label>OKR 期間</label>
            <OkrPeriodSelect
              okrPeriods={okrPeriods}
              value={okrPeriodId}
              onChange={this.handleOkrPeriodChange}
            />
          </dd>
          <dd>
            <a href={`/okr_periods/${okrPeriodId}/export`} download className="download-link" ref="downloadLink" />
            <Button content="エクスポート" onClick={this.handleExportClick} />
          </dd>
        </dl>
      </Tab.Pane>
    )
  }
}

OrganizationSettingTab.propTypes = {
  // container
  organization: ImmutablePropTypes.map.isRequired,
  okrPeriods: ImmutablePropTypes.list.isRequired,
  okrPeriodId: PropTypes.number.isRequired,
  updateOrganization: PropTypes.func.isRequired,
  openLogoModal: PropTypes.func.isRequired,
  deleteLogo: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
}

export default OrganizationSettingTab
