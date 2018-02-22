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
      props.openOkrModal(props.objectiveId, { okrType: props.okrType })
    }
  }
  componentWillReceiveProps(nextProps) {
    const isChangedURL = nextProps.okrType !== this.props.okrType || nextProps.objectiveId !== this.props.objectiveId;
    if (isChangedURL) {
      this.props.openOkrModal(nextProps.objectiveId, { okrType: nextProps.okrType })
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
