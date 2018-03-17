import React, { Component } from 'react';
import { getOkrId, goToRoot } from '../utils/linker';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.okrHash) {
      const { objectiveId, keyResultId } = getOkrId(nextProps.okrHash);
      if (!objectiveId && !keyResultId) {
        this.props.openErrorModal('指定された OKR は存在しません');
        goToRoot();
        return;
      }

      if (!nextProps.isOpenOkrModal) {
        this.props.openOkrModal(objectiveId, keyResultId);
      }
    }
  }
  render() {
    return (
      <div className='home'>
        <MenuBar />
        <main>
          <Dashboard {...this.props} />
          <KeyResultModal/>
          <ObjectiveModal/>
          <OkrModal/>
        </main>
      </div>
    );
  }
}

export default Home;
