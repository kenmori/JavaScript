import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import OkrPieChart from './OkrPieChart';

class OkrList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObjective: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objectives.size !== nextProps.objectives.size) {
      // Objective一覧取得時、Objective追加/削除時は最初のObjectiveを選択する
      const objective = nextProps.objectives.first();
      this.setState({
        selectedObjective: objective,
      });
      this.props.onSelect(objective);
    }
  }

  selectObjective = (objective) => {
    this.setState({
      selectedObjective: objective
    });
    this.props.onSelect(objective);
  }

  render() {
    return (
      <div className="okr-list">
        <a className="okr-box" href="javascript:void(0)" onClick={this.props.openObjectiveFormModal}>
          <Button content='OKR を作成する' />
        </a>
        {
          this.props.objectives.map((objective) => {
            const isSelected = objective.get('id') === (this.state.selectedObjective && this.state.selectedObjective.get('id'));
            return (
              <a className={`okr-box ${isSelected ? 'active' : ''}`} key={objective.get('id')}
                 href="javascript:void(0)" onClick={() => this.selectObjective(objective)}>
                <div className='name'>{objective.get('name')}</div>
                <OkrPieChart objective={objective} />
              </a>
            );
          })}
      </div>
    );
  }
}

OkrList.propTypes = {
  objectives: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default OkrList;
