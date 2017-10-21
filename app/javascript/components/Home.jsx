import React, { Component } from 'react';
import MenuBar from '../containers/MenuBar';
import DashBoard from '../containers/DashBoard';
import KeyResultFormModal from '../containers/KeyResultFormModal';
import ObjectiveDetailModal from '../containers/ObjectiveDetailModal';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <MenuBar />
        <main>
          <DashBoard />
          <KeyResultFormModal/>
          <ObjectiveDetailModal/>
        </main>
      </div>
    );
  }
}

export default Home;
