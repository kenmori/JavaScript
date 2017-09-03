import React, { Component } from 'react';
import { Button, Icon, Tab } from 'semantic-ui-react';
import ObjectiveFormModal from '../containers/ObjectiveFormModal';
import KeyResultFormModal from '../containers/KeyResultFormModal';
import ObjectiveDetailModal from '../containers/ObjectiveDetailModal';
import ObjectiveMapTab from './ObjectiveMapTab'

class OKRSettingPage extends Component {
  componentDidMount() {
    this.props.fetch();
  }
  
  get panes() {
    return ([
      {
        menuItem: '上長から割り当てられた検討前のOKR',
        render: () => (<ObjectiveMapTab objectives={this.props.objectives}/>)
      },
      { menuItem: '承認待ちのOKR', render: () => <Tab.Pane attached={false}>Tab 2 Content</Tab.Pane> },
      { menuItem: '部下が提案したOKR', render: () => <Tab.Pane attached={false}>Tab 3 Content</Tab.Pane> }
    ]);
  }
  
  render() {
    return (
      <div className='okr-setting-page'>
        <h2>OKR設定</h2>
        <br/>
        <Button negative onClick={this.props.openObjectiveFormModal}><Icon name='plus'/>新規作成</Button>
        <Tab menu={{ secondary: true, pointing: true }} panes={this.panes} className='okr-tabs'/>
        <ObjectiveFormModal/>
        <KeyResultFormModal/>
        <ObjectiveDetailModal/>
      </div>
    );
  }
}

OKRSettingPage.propTypes = {};

export default OKRSettingPage;
