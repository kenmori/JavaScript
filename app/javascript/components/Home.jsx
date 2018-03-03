import React, { Component } from 'react';
import history from '../utils/history';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';


class Home extends Component {
  componentWillReceiveProps(nextProps) {
    if (!nextProps.hasOkrModalResource) {
      return;
    }

    if (nextProps.cannotDisplayOkrModal && !nextProps.isOpenErrorModal) {
      this.props.openErrorModal("指定された OKR は存在しません");
      setTimeout(() => history.push('/'), 0);
      return;
    }

    const isChangedURL = nextProps.objectiveId !== this.props.objectiveId ||
                          nextProps.keyResultId !== this.props.keyResultId;
    if (!nextProps.isOpenOkrModal || isChangedURL) {
      this.displayModal(nextProps); 
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
          {this.props.isOpenOkrModal && !this.props.objectives.isEmpty() && <OkrModal objectiveIdOfRemovedKeyResult={this.props.objectiveIdOfRemovedKeyResult} />}
        </main>
      </div>
    );
  }
}

export default Home;
