import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';
import Dashboard from '../containers/Dashboard';
import KeyResultFormModal from '../containers/KeyResultFormModal';
import ObjectiveFormModal from '../containers/ObjectiveFormModal';
import ObjectiveDetailModal from '../containers/ObjectiveDetailModal';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <MenuBar />
        <main>
          <Dashboard />
          <KeyResultFormModal/>
          <ObjectiveFormModal/>
          <ObjectiveDetailModal/>
        </main>
      </div>
    );
  }
}

export default Home;
