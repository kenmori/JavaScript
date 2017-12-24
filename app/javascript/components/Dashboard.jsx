import React, { Component } from 'react';
import OkrList from '../containers/OkrList';
import OkrMap from './OkrMap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedObjectiveId: null,
    };
  }

  componentDidMount() {
    this.props.fetchObjectives(this.props.menu.get('okrPeriodId'), this.props.menu.get('userId'));
  }

  componentWillReceiveProps(nextProps) {
    const [okrPeriodId, userId] = [this.props.menu.get('okrPeriodId'), this.props.menu.get('userId')];
    const [nextOkrPeriodId, nextUserId] = [nextProps.menu.get('okrPeriodId'), nextProps.menu.get('userId')];
    if (okrPeriodId !== nextOkrPeriodId || userId !== nextUserId) {
      this.props.fetchObjectives(nextOkrPeriodId, nextUserId);
    }
  }

  selectObjective = objective => {
    this.setState({
      selectedObjectiveId: objective.get('id'),
    });
  }

  render() {
    if(!this.props.objectives) return;
    const selectedObjective = this.props.objectives.find((objective) => objective.get('id') === this.state.selectedObjectiveId);
    return (
      <div className="dashboard">
        <section className="okr-list-section">
          <h2>OKR 一覧 ({this.props.objectives.size})</h2>
          <OkrList objectives={this.props.objectives}
                   selectedObjective={selectedObjective}
                   onSelect={this.selectObjective} />
        </section>
        <section className='okr-map-section'>
          <h2>OKR マップ</h2>
          {selectedObjective && <OkrMap objective={selectedObjective} />}
        </section>
      </div>
    );
  }
}
