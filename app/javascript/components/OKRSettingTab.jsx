import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Input, Select } from 'semantic-ui-react';

class OKRSettingTab extends Component {

  static get YEAR_END_OPTIONS() {
    return [
      { key: 'Jan', value: 1, text: '1月' },
      { key: 'Feb', value: 2, text: '2月' },
      { key: 'Mar', value: 3, text: '3月' },
      { key: 'Apr', value: 4, text: '4月' },
      { key: 'May', value: 5, text: '5月' },
      { key: 'Jun', value: 6, text: '6月' },
      { key: 'Jul', value: 7, text: '7月' },
      { key: 'Aug', value: 8, text: '8月' },
      { key: 'Sep', value: 9, text: '9月' },
      { key: 'Oct', value: 10, text: '10月' },
      { key: 'Nov', value: 11, text: '11月' },
      { key: 'Dec', value: 12, text: '12月' },
    ];
  }

  static get OKR_SPAN_OPTIONS() {
    return [
      { key: 'quarter', value: 3, text: '3ヶ月間' },
      { key: 'half', value: 6, text: '半年間' },
      { key: 'year', value: 12, text: '1年間' },
    ];
  }

  componentDidMount() {
    this.props.fetchOkrSettings(gon.organization.id);
  }

  render() {
    const okrSettings = this.props.okrSettings;
    if (okrSettings.isEmpty()) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="okr-setting-tab">
        <dl>
          <dt>年度末</dt>
          <dd>
            <Select options={OKRSettingTab.YEAR_END_OPTIONS} defaultValue={okrSettings.get('yearEnd')}/>
          </dd>

          <dt>OKR 期間</dt>
          <dd>
            <Select options={OKRSettingTab.OKR_SPAN_OPTIONS} defaultValue={okrSettings.get('span')}/>
          </dd>

          <dt>OKR 準備期間</dt>
          <dd>
            期初
            <Input label="日前" labelPosition="right" defaultValue={okrSettings.get('readyFrom')}/>
            〜
            <Input label="日前" labelPosition="right" readOnly="true" defaultValue={okrSettings.get('readyTo')}/>
          </dd>

          <dt>振り返り期間 (期中)</dt>
          <dd>
            期初
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewDuringFrom')}/>
            〜
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewDuringTo')}/>
          </dd>

          <dt>振り返り期間 (期末)</dt>
          <dd>
            期末
            <Input label="日後" labelPosition="right" readOnly="true" defaultValue={okrSettings.get('reviewEndFrom')}/>
            〜
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewEndTo')}/>
          </dd>
        </dl>

        <Button content="リセット"/>
        <Button content="保存" positive={true}/>
      </Tab.Pane>
    );
  }
}

OKRSettingTab.propTypes = {
  fetchOkrSettings: PropTypes.func.isRequired,
};

export default OKRSettingTab;
