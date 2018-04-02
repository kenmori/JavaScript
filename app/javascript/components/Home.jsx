import React, { Component } from 'react';
import { getOkrId } from '../utils/linker';
import MenuBar from '../containers/MenuBar';
import Dashboard from '../containers/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {

  componentWillReceiveProps(nextProps) {
    if (nextProps.okrHash) {
      const { objectiveId, keyResultId } = getOkrId(nextProps.okrHash);
      if (!nextProps.isOpenOkrModal || this.props.okrHash !== nextProps.okrHash) {
        this.props.openOkrModal(objectiveId, keyResultId);
      }
    } else {
      if (nextProps.isOpenOkrModal) {
        this.props.closeOkrModal();
      }
    }
  }

  render() {
    return (
      <div className='home'>
        <MenuBar />
        <main>
          <Dashboard />
          <KeyResultModal/>
          <ObjectiveModal/>
          <OkrModal/>
        </main>
      </div>
    );
  }
}

export default Home;
