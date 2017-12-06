import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OkrPieChart from './OkrPieChart';

class OkrList extends Component {
  selectOKRBox = (objective) => {
    return () => {
      this.setState({
        selectedObjective: objective
      });
      this.props.onSelect(objective);
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedObjective: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.objectives && this.props.objectives !== nextProps.objectives) {
      //Objective一覧を取得、Objective追加時には最新のObjectiveをセットする
      this.setState({
        selectedObjective: nextProps.objectives.first()
      });
      this.props.onSelect(nextProps.objectives.first());
    }
  }

  render() {
    return (
      <div className="okr-list">
        {
          this.props.objectives.map((objective) => {
            const isSelected = objective.get('id') === (this.state.selectedObjective && this.state.selectedObjective.get('id'));
            return (
              <a className={`okr-box ${isSelected ? 'active' : ''}`} key={objective.get('id')}
                 href="javascript:void(0)" onClick={this.selectOKRBox(objective)}>
                <div>{objective.get('name')}</div>
                <OkrPieChart objective={objective} />
              </a>
            );
          })}
        <a className={`okr-box ${this.state.selectedObjective ? '' : 'active'}`} href="javascript:void(0)"
           onClick={() => this.props.openObjectiveFormModal()}>
          Objective を作成する
        </a>
      </div>
    );
  }
}

OkrList.propTypes = {
  objectives: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OkrList;
