import React, { Component } from 'react';
import { goToRoot } from '../utils/linker';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
  componentWillReceiveProps(nextProps) {
    const state = nextProps.okrModalState;
    if (state.isVoid) {
      return;
    }

    if (state.isInvalidOkr) {
      this.props.openErrorModal("指定された OKR は存在しません");
      goToRoot();
      return;
    }

    const isChangedURL = state.objectiveId !== this.props.okrModalState.objectiveId ||
                          state.keyResultId !== this.props.okrModalState.keyResultId;
    if (!state.isOpenOkrModal || isChangedURL) {
      this.displayModal(state);
    }
  }
  displayModal(props) {
    this.props.openOkrModal(props.objectiveId, props.keyResultId);
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
