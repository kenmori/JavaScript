import React, { Component } from 'react';
import OKRCreationFlow from '../containers/OKRCreationFlow';
import { Route, Switch } from 'react-router-dom';
import MenuBar from '../containers/MenuBar';
import DashBoard from '../containers/DashBoard';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <MenuBar />
        <DashBoard />
        <main>
          <Switch>
            <Route exact path='/' component={OKRCreationFlow}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default Home;
