import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import { getOkrId } from '../utils/linker';
import Fetcher from '../containers/Fetcher'
import MenuBar from '../containers/MenuBar';
import Dashboard from '../containers/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';
import OptionModal from '../containers/OptionModal'

class Home extends PureComponent {

  constructor(props) {
    super(props);
    if (props.okrHash) {
      this.openOkrModal(props.okrHash);
    }
  }

  componentWillReceiveProps(nextProps) {
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
        <Fetcher />
        <MenuBar />
        <main>
          <Dashboard />
          <KeyResultModal/>
          <ObjectiveModal/>
          <OkrModal/>
          <OptionModal />
        </main>
      </div>
    );
  }
}

Home.propTypes = {
  // container
  okrHash: PropTypes.string,
  isOpenOkrModal: PropTypes.bool.isRequired,
  openOkrModal: PropTypes.func.isRequired,
  closeOkrModal: PropTypes.func.isRequired,
  // component
}

export default Home;
