import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
  constructor(props) {
    super(props);
    if (props.objectiveId && props.okrType) {
      props.openOkrModal(Number(props.objectiveId), { okrType: props.okrType, targetId: Number(props.keyResultId) })
    }
  }
  componentWillReceiveProps(nextProps) {
    const isChangedURL = nextProps.okrType !== this.props.okrType || 
                          nextProps.objectiveId !== this.props.objectiveId ||
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
          {this.props.isOpenOkrModal && !this.props.objectives.isEmpty() && <OkrModal/>}
        </main>
      </div>
    );
  }
}

export default Home;
