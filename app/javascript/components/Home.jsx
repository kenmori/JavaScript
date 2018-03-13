import React, { Component } from 'react';
import { hashids, OKR_TYPE_ID } from '../utils/hashids';
import history from '../utils/history';
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
      history.push('/');
      return;
    }

    if (state.objectiveIdOfRemovedKeyResult) {
      const okrHash = hashids.encode(OKR_TYPE_ID.OBJECTIVE, state.objectiveIdOfRemovedKeyResult);
      history.push(`/okr/${okrHash}`);
      return;
    }

    if (state.isRemovedObjective) {
      history.push('/');
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
    this.props.openOkrModal(Number(props.objectiveId), { okrType: props.okrType, targetId: Number(props.keyResultId) });
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
