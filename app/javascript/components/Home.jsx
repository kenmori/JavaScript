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
    const status = nextProps.okrModalStatus;
    if (!status.hasOkrModalResource) {
      return;
    }

    if (status.needFetchKeyResult) {
      this.props.fetchKeyResult(status.keyResultId);
      return;
    }

    if (status.needFetchObjective) {
      this.props.fetchObjective(status.objectiveId);
      return;
    }

    if (status.isRemovedObjective) {
      history.push('/');
      return;
    }

    if (status.objectiveIdOfRemovedKeyResult) {
      const okrHash = hashids.encode(OKR_TYPE_ID.OBJECTIVE, status.objectiveIdOfRemovedKeyResult);
      history.push(`/okr/${okrHash}`);
      return;
    }
    // if (status.cannotDisplayOkrModal && !status.isOpenErrorModal) {
    //   this.props.openErrorModal("指定された OKR は存在しません");
    //   setTimeout(() => history.push('/'), 0);
    //   return;
    // }

    const isChangedURL = status.objectiveId !== this.props.okrModalStatus.objectiveId ||
                          status.keyResultId !== this.props.okrModalStatus.keyResultId;
    if (status.canDisplayOkrModal && (!status.isOpenOkrModal || isChangedURL)) {
      this.displayModal(status);
      this.props.resetKeyResult();
    }
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
          {this.props.okrModalStatus.isOpenOkrModal && !this.props.objectives.isEmpty() && <OkrModal objectiveIdOfRemovedKeyResult={this.props.objectiveIdOfRemovedKeyResult} />}
        </main>
      </div>
    );
  }
}

export default Home;
