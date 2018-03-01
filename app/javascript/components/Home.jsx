import React, { Component } from 'react';
import history from '../utils/history';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
  constructor(props) {
    super(props);
    if (props.objectiveId) {
      props.openOkrModal(Number(props.objectiveId), { okrType: props.okrType, targetId: Number(props.keyResultId) });
      return;
    }

    const notExistOkr = props.hasOkrHashId && !props.keyResultId;
    if (notExistOkr) {
      props.openErrorModal("指定された OKR は存在しません");
      setTimeout(() => history.push('/'), 0);
    }
  }
  componentWillReceiveProps(nextProps) {
    const isChangedURL = nextProps.objectiveId !== this.props.objectiveId ||
                          nextProps.keyResultId !== this.props.keyResultId;
    if (isChangedURL) {
      this.props.openOkrModal(Number(nextProps.objectiveId), { okrType: nextProps.okrType, targetId: Number(nextProps.keyResultId) })
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
          {this.props.isOpenOkrModal && !this.props.objectives.isEmpty() && <OkrModal objectiveIdOfRemovedKeyResult={this.props.objectiveIdOfRemovedKeyResult} />}
        </main>
      </div>
    );
  }
}

export default Home;
