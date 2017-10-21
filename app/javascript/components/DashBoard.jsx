import React, { Component } from 'react';
import ObjectiveMap from './ObjectiveMap';

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedObjective: null};
  }

  componentDidMount() {
    this.props.fetchObjectives({okrPeriodId: this.props.okrPeriod.get('id')});
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.objectives.size == 0 && nextProps.objectives && this.props.objectives !== nextProps.objectives) {
      //初回にObjective一覧を取得した際にはデフォルトで最初のObjectiveをセットする
      this.setState({
        selectedObjective: nextProps.objectives.first(),
      });
    }
  }

  selectOKRBox(objective) {
    this.setState({
      selectedObjective: objective,
    });
  }

  render() {
    return (
      <div className="dash-board">
        <section className="login-user">
          <div className="avatar flex-center">
            {this.props.loginUser.get('lastName')}
          </div>
          <div className="info flex-vertical-center">
            <div>{this.props.loginUser.get('lastName') + this.props.loginUser.get('firstName')}</div>
            <div>{this.props.loginUser.get('email')}</div>
          </div>
        </section>
        <section className="okr">
          OKR一覧({this.props.objectives.size})
          <div className="okr-list">
            {
              this.props.objectives.map((objective) => {
                let isSelected = objective.get('id') === (this.state.selectedObjective && this.state.selectedObjective.get('id'));
                return (
                  <a className={`okr-box ${isSelected ? 'active' : null}`} key={objective.get('id')}
                     href="javascript:void(0)" onClick={() => this.selectOKRBox(objective)}>
                    {objective.get('name')}
                  </a>
                );
              }) }
            <a className="okr-box" href="javascript:void(0)">
              OKR を作成する
            </a>
          </div>
        </section>
        <section className='okr-action-section'>
          {
            (() => {
              if(this.state.selectedObjective) {
                return <ObjectiveMap objective={this.state.selectedObjective}/>;
              }
            })()
          }
        </section>
      </div>
    );
  }
}
