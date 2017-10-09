import React, { Component } from 'react';

export default class DashBoard extends Component {
  componentDidMount() {
    this.props.fetchObjectives({okrPeriodId: this.props.okrPeriod.get('id')});
  }

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
          OKR一覧({this.props.objectives.size})
          <div className="okr-list">
            {
              this.props.objectives.map((objective) => {
                return (
                  <a className="okr-box" key={objective.get('id')} href="javascript:void(0)">
                    {objective.get('name')}
                  </a>
                );
              }) }
            <a className="okr-box" href="javascript:void(0)">
              OKR を作成する
            </a>
          </div>
        </div>
      </div>
    );
  }
}
