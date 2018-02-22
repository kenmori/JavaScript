import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';
import Dashboard from './dashboard/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
  constructor(props) {
    super(props);
    if (props.okrType && props.okrId) {
      props.openOkrModal(Number(props.okrId), { okrType: props.okrType })
    }
  }
  componentWillReceiveProps(nextProps) {
    const isChangedURL = nextProps.okrType !== this.props.okrType || nextProps.okrId !== this.props.okrId;
    if (isChangedURL) {
      this.props.openOkrModal(Number(nextProps.okrId), { okrType: nextProps.okrType })
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
