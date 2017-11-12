import React, { Component } from 'react';
import ObjectiveForm from '../containers/ObjectiveForm';
import ObjectiveMap from './ObjectiveMap';
import ObjectivePieChart from './ObjectivePieChart';
import Avatar from './Avatar';

export default class DashBoard extends Component {
  static ACTIONS = {
    objective_creation: 'objective_creation',
    objective_selection: 'objective_selection'
  };

  selectOKRBox = (objective) => {
    return () => {
      this.setState({
        action: DashBoard.ACTIONS.objective_selection,
        selectedObjective: objective
      });
    }
  };
  showObjectiveForm = () => {
    this.setState({
      action: DashBoard.ACTIONS.objective_creation,
      selectedObjective: null
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedObjective: null,
      action: null,
    };
  }

  componentDidMount() {
    this.props.fetchObjectives({okrPeriodId: this.props.okrPeriod.get('id')});
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.objectives && this.props.objectives !== nextProps.objectives) {
      //Objective一覧を取得、Objective追加時には最新のObjectiveをセットする
      this.setState({
        action: DashBoard.ACTIONS.objective_selection,
        selectedObjective: nextProps.objectives.first()
      });
    }
  }

  get actionSection() {
    switch(this.state.action) {
      case DashBoard.ACTIONS.objective_creation:
        return <div className="objective-form-block">
          <ObjectiveForm />
        </div>;
      case DashBoard.ACTIONS.objective_selection:
        return <ObjectiveMap objective={this.state.selectedObjective}/>;
    }
  }

  render() {
    return (
      <div className="dash-board">
        <section className="login-user">
          <Avatar path={this.props.loginUser.get('avatarPath')} name={this.props.loginUser.get('lastName')} />
          <div className="info flex-vertical-center">
            <div>{this.props.loginUser.get('lastName') + this.props.loginUser.get('firstName')}</div>
            <div>{this.props.loginUser.get('email')}</div>
          </div>
        </section>
        <section className="okr">
          Objective 一覧 ({this.props.objectives.size})
          <div className="okr-list">
            {
              this.props.objectives.map((objective) => {
                const isSelected = objective.get('id') === (this.state.selectedObjective && this.state.selectedObjective.get('id'));
                return (
                  <a className={`okr-box ${isSelected ? 'active' : ''}`} key={objective.get('id')}
                     href="javascript:void(0)" onClick={this.selectOKRBox(objective)}>
                    <div>{objective.get('name')}</div>
                    <ObjectivePieChart objective={objective}/>
                  </a>
                );
              }) }
            <a className={`okr-box ${this.state.selectedObjective ? '' : 'active'}`} href="javascript:void(0)" onClick={this.showObjectiveForm}>
              Objective を作成する
            </a>
          </div>
        </section>
        <section className='okr-action-section'>
          {this.actionSection}
        </section>
      </div>
    );
  }
}
