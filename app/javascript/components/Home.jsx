import React, { Component } from 'react';
import { openObjective, goToRoot } from '../utils/linker';
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
      this.resetFetchedOkr();
      goToRoot();
      return;
    }

    if (state.objectiveIdOfRemovedKeyResult) {
      openObjective(state.objectiveIdOfRemovedKeyResult);
      return;
    }

    if (state.isRemovedObjective) {
      goToRoot();
      return;
    }

    if (state.needFetchingKeyResult) {
      this.props.fetchKeyResult(state.keyResultId);
    }

    if (state.needFetchingObjective) {
      this.props.fetchObjective(state.objectiveId);
    }

    if (state.needFetchingKeyResult || state.needFetchingObjective) {
      return;
    }    

    const isChangedURL = state.objectiveId !== this.props.okrModalState.objectiveId ||
                          state.keyResultId !== this.props.okrModalState.keyResultId;
    if (state.canDisplayOkrModal && (!state.isOpenOkrModal || isChangedURL)) {
      this.displayModal(state);
      this.resetFetchedOkr();
    }
  }
  resetFetchedOkr() {
    this.props.resetObjective();
    this.props.resetKeyResult();
  }
  displayModal(props) {
    this.props.openOkrModal(Number(props.objectiveId), Number(props.keyResultId));
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
