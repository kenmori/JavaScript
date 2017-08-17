import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

class ObjectiveSelector extends Component {

  get optionsFromObjective() {
    // TODO:
    // 仮データー
    // objectivesからoptions生成する。
    return [
      {
        placeholder: '年度を選択してください',
        options: [
          { key: '2012', value: '2012', text: '2012' },
          { key: '2013', value: '2013', text: '2013' },
          { key: '2014', value: '2014', text: '2014' },
          { key: '2015', value: '2015', text: '2015' },
          { key: '2016', value: '2016', text: '2016' },
          { key: '2017', value: '2017', text: '2017' },
        ]
      },
      {
        placeholder: '四半期を選択してください',
        options: [
          {key: '1Q', value: '1Q', text: '1Q'},
          {key: '2Q', value: '2Q', text: '2Q'},
          {key: '3Q', value: '3Q', text: '3Q'},
          {key: '4Q', value: '4Q', text: '4Q'},
        ],
      },
      {
        placeholder: 'ユーザを選択してください',
        options: [
          {key: '堀江', value: '堀江', text: '堀江'},
          {key: '篠原', value: '篠原', text: '篠原'},
          {key: '岩田', value: '岩田', text: '岩田'},
          {key: '鄭', value: '鄭', text: '鄭'},
        ]
      }
    ]
  }

  onSelect() {
    // TODO:
    // 要素が選択された時の処理実装
  }

  render() {
    const stateOptions = this.optionsFromObjective;
    console.log(stateOptions);
    return(
      <div>
        {
          stateOptions.map(
            (stateOption) => <Dropdown placeholder={stateOption.placeholder} search selection options={stateOption.options}/>
          )
        }
      </div>
    )
  }
}

export default ObjectiveSelector;
