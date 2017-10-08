import React, { Component } from 'react';

export default class DashBoard extends Component {
  render() {
    return (
      <div className="dash-board">
        <div className="login-user flex">
          <div className="avatar flex-center">
            {this.props.loginUser.get('lastName')}
          </div>
          <div className="info flex-vertical-center">
            <div>{this.props.loginUser.get('lastName') + this.props.loginUser.get('firstName')}</div>
            <div>{this.props.loginUser.get('email')}</div>
          </div>
        </div>
        <div className="okr">
          OKR一覧(0)
          <div className="okr-list">
            <span className="okr-box">
              OKR を作成する
            </span>
          </div>
        </div>
      </div>
    );
  }
}
