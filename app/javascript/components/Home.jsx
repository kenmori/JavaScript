import React, { Component } from 'react';
import OKRSettingPage from '../containers/OKRSettingPage';
import { Route, Switch } from 'react-router-dom';
import MenuBar from '../containers/MenuBar';

class Home extends Component {
  render() {
    return (
      <div className='home'>
        <MenuBar />
        <main>
          <Switch>
            <Route exact path='/okr/setting' component={OKRSettingPage}/>
            <Route exact path='/' component={OKRSettingPage}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default Home;
