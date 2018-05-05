import React, { Component } from 'react';
import { getOkrId } from '../utils/linker';
import MenuBar from '../containers/MenuBar';
import Dashboard from '../containers/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {

  constructor(props) {
    super(props);
    if (props.okrHash) {
      this.openOkrModal(props.okrHash);
    }
  }

  componentDidMount() {
    this.props.fetchOrganization(this.props.organizationId)
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFetchedOrganization && nextProps.isFetchedOrganization) {
      this.props.fetchOkrs(this.props.okrPeriodId, this.props.userId)
    } else if (this.props.okrPeriodId !== nextProps.okrPeriodId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId)
    } else if (this.props.userId !== nextProps.userId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId, false)
    }
    if (nextProps.okrHash) {
      if (!nextProps.isOpenOkrModal || this.props.okrHash !== nextProps.okrHash) {
        this.openOkrModal(nextProps.okrHash);
      }
    } else {
      if (nextProps.isOpenOkrModal) {
        this.props.closeOkrModal();
      }
    }
  }

  openOkrModal(okrHash) {
    const { objectiveId, keyResultId } = getOkrId(okrHash);
    this.props.openOkrModal(objectiveId, keyResultId);
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
