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

  constructor(props) {
    super(props);
    this.state = {
      okrSettings: this.props.okrSettings
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.okrSettings !== nextProps.okrSettings) {
      this.setState({
        okrSettings: nextProps.okrSettings
      });
    }
  }

  componentDidMount() {
    this.props.fetchOkrSettings(gon.organization.id);
  }

  updateOkrSettings = () => {
    const okrSettings = {
      yearEnd: this.state.okrSettings.get('yearEnd'),
      span: this.state.okrSettings.get('span'),
      readyFrom: this.state.okrSettings.get('readyFrom'),
      readyTo: this.state.okrSettings.get('readyTo'),
      reviewDuringFrom: this.state.okrSettings.get('reviewDuringFrom'),
      reviewDuringTo: this.state.okrSettings.get('reviewDuringTo'),
      reviewEndFrom: this.state.okrSettings.get('reviewEndFrom'),
      reviewEndTo: this.state.okrSettings.get('reviewEndTo'),
    };
    this.props.updateOkrSettings(gon.organization.id, okrSettings);
  };

  resetOkrSettings = () => {
    this.props.resetOkrSettings(gon.organization.id);
  };

  handleChange = (event, data) => {
    this.setState({
      okrSettings: this.state.okrSettings.set(data.name, data.value)
    })
  };

  render() {
    const okrSettings = this.state.okrSettings;
    if (okrSettings.isEmpty()) {
      return null;
    }
    return (
      <Tab.Pane attached={false} className="okr-setting-tab">
        <dl>
          <dt>年度末</dt>
          <dd>
            <Select options={OKRSettingTab.YEAR_END_OPTIONS} value={okrSettings.get('yearEnd')}
                    onChange={this.handleChange} name="yearEnd"/>
          </dd>

          <dt>OKR 期間</dt>
          <dd>
            <Select options={OKRSettingTab.OKR_SPAN_OPTIONS} value={okrSettings.get('span')}
                    onChange={this.handleChange} name="span"/>
          </dd>

          <dt>OKR 準備期間</dt>
          <dd>
            期初
            <Input label="日前" labelPosition="right" value={okrSettings.get('readyFrom')}
                   onChange={this.handleChange} name="readyFrom"/>
            〜
            <Input label="日前" labelPosition="right" readOnly="true" value={okrSettings.get('readyTo')}
                   onChange={this.handleChange} name="readyTo" className="readonly"/>
          </dd>

          <dt>振り返り期間 (期中)</dt>
          <dd>
            期初
            <Input label="日後" labelPosition="right" value={okrSettings.get('reviewDuringFrom')}
                   onChange={this.handleChange} name="reviewDuringFrom"/>
            〜
            <Input label="日後" labelPosition="right" value={okrSettings.get('reviewDuringTo')}
                   onChange={this.handleChange} name="reviewDuringTo"/>
          </dd>

          <dt>振り返り期間 (期末)</dt>
          <dd>
            期末
            <Input label="日後" labelPosition="right" readOnly="true" value={okrSettings.get('reviewEndFrom')}
                   onChange={this.handleChange} name="reviewEndFrom" className="readonly"/>
            〜
            <Input label="日後" labelPosition="right" value={okrSettings.get('reviewEndTo')}
                   onChange={this.handleChange} name="reviewEndTo"/>
          </dd>
        </dl>

        <Button content="リセット" onClick={this.resetOkrSettings}/>
        <Button content="保存" positive={true} onClick={this.updateOkrSettings}/>
      </Tab.Pane>
    );
  }
}

OKRSettingTab.propTypes = {
  fetchOkrSettings: PropTypes.func.isRequired,
  updateOkrSettings: PropTypes.func.isRequired,
  resetOkrSettings: PropTypes.func.isRequired,
};

export default OKRSettingTab;
