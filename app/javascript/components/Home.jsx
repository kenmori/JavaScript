import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';
import Dashboard from '../containers/Dashboard';
import KeyResultModal from '../containers/KeyResultModal';
import ObjectiveModal from '../containers/ObjectiveModal';
import OkrModal from '../containers/OkrModal';

class Home extends Component {
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
