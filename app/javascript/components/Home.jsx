import React, { Component } from "react";
import OKRSettingPage from "../containers/OKRSettingPage";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MenuBar from "./MenuBar";

class Home extends Component {
  render() {
    return (
      <Router>
        <div className="wrapper">
          <MenuBar />
          <main>
            <Route exact path="/" component={OKRSettingPage}/>
            <Route exact path="/okr/setting" component={OKRSettingPage}/>
          </main>
        </div>
      </Router>
    )
  }
}

export default Home