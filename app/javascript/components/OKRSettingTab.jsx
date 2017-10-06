import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Button, Input, Dropdown } from 'semantic-ui-react';

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

  updateOkrSettings = () => {
    const okrSettings = {
      yearEnd: this.yearEndSelect.getSelectedItem().value,
      span: this.spanSelect.getSelectedItem().value,
      readyFrom: this.readyFromInput.inputRef.value,
      readyTo: this.readyToInput.inputRef.value,
      reviewDuringFrom: this.reviewDuringFromInput.inputRef.value,
      reviewDuringTo: this.reviewDuringToInput.inputRef.value,
      reviewEndFrom: this.reviewEndFromInput.inputRef.value,
      reviewEndTo: this.reviewEndToInput.inputRef.value,
    };
    this.props.updateOkrSettings(gon.organization.id, okrSettings);
  };

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
            <Dropdown selection options={OKRSettingTab.YEAR_END_OPTIONS} defaultValue={okrSettings.get('yearEnd')}
                      ref={node => { this.yearEndSelect = node; }}/>
          </dd>

          <dt>OKR 期間</dt>
          <dd>
            <Dropdown selection options={OKRSettingTab.OKR_SPAN_OPTIONS} defaultValue={okrSettings.get('span')}
                      ref={node => { this.spanSelect = node; }}/>
          </dd>

          <dt>OKR 準備期間</dt>
          <dd>
            期初
            <Input label="日前" labelPosition="right" defaultValue={okrSettings.get('readyFrom')}
                   ref={node => { this.readyFromInput = node; }}/>
            〜
            <Input label="日前" labelPosition="right" readOnly="true" defaultValue={okrSettings.get('readyTo')}
                   ref={node => { this.readyToInput = node; }} className="readonly"/>
          </dd>

          <dt>振り返り期間 (期中)</dt>
          <dd>
            期初
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewDuringFrom')}
                   ref={node => { this.reviewDuringFromInput = node; }}/>
            〜
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewDuringTo')}
                   ref={node => { this.reviewDuringToInput = node; }}/>
          </dd>

          <dt>振り返り期間 (期末)</dt>
          <dd>
            期末
            <Input label="日後" labelPosition="right" readOnly="true" defaultValue={okrSettings.get('reviewEndFrom')}
                   ref={node => { this.reviewEndFromInput = node; }} className="readonly"/>
            〜
            <Input label="日後" labelPosition="right" defaultValue={okrSettings.get('reviewEndTo')}
                   ref={node => { this.reviewEndToInput = node; }}/>
          </dd>
        </dl>

        <Button content="リセット"/>
        <Button content="保存" positive={true} onClick={this.updateOkrSettings}/>
      </Tab.Pane>
    );
  }
}

OKRSettingTab.propTypes = {
  fetchOkrSettings: PropTypes.func.isRequired,
  updateOkrSettings: PropTypes.func.isRequired,
};

export default OKRSettingTab;
