import React, { Component } from 'react';
import { Menu, Button, Segment, Header } from 'semantic-ui-react';
import ObjectiveList from '../containers/ObjectiveList';
import KeyResultList from '../containers/KeyResultList';
import OkrMap from '../containers/OkrMap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapObjective: null,
      activeItem: 'objective',
    };
  }

  componentDidMount() {
    this.props.fetchObjectives(this.props.okrPeriodId, this.props.userId);
    this.props.fetchKeyResults(this.props.okrPeriodId, this.props.userId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.okrPeriodId !== nextProps.okrPeriodId || this.props.userId !== nextProps.userId) {
      this.props.fetchObjectives(nextProps.okrPeriodId, nextProps.userId);
      this.props.fetchKeyResults(nextProps.okrPeriodId, nextProps.userId);
    } else if (this.props.fetchedObjectiveId !== nextProps.fetchedObjectiveId) {
      this.setMapObjective(nextProps.fetchedObjective);
    } else if (this.props.objectiveIds !== nextProps.objectiveIds) {
      const objective = this.getNextMapObjective(this.props.objectives, nextProps.objectives);
      this.setMapObjective(objective);
      if (objective) {
        this.props.changeCurrentObjective(objective.get('id'));
      }
    } else if (this.props.entities !== nextProps.entities) {
      const objective = this.getCurrentMapObjective(nextProps.objectives, nextProps.fetchedObjective);
      if (objective) {
        this.setMapObjective(objective);
      }
    }
  }

  getNextMapObjective = (prevObjectives, nextObjectives) => {
    // Objective 一覧取得時や追加/削除時に選択する Objective を返す
    const prevObjectiveId = this.state.mapObjective && this.state.mapObjective.get('id');
    const nextObjective = nextObjectives.first();
    if (!prevObjectiveId) {
      return nextObjective; // 未選択の場合
    }
    const prevObjective = nextObjectives.find(objective => objective.get('id') === prevObjectiveId);
    if (!prevObjective) {
      return nextObjective; // 前回の選択 Objective が存在しない場合
    }
    if (prevObjectives.size < nextObjectives.size) {
      if (!nextObjective.get('parentObjectiveId')) {
        return nextObjective; // 追加された Objective が親を持たない場合 (新規作成)
      }
    }
    return prevObjective; // 選択状態は変えない
  }

  getCurrentMapObjective = (nextObjectives, nextFetchedObjective) => {
    // 現在選択中の Objective を nextProps の中から探して返す
    const prevObjectiveId = this.state.mapObjective && this.state.mapObjective.get('id');
    const prevObjective = nextObjectives.find(objective => objective.get('id') === prevObjectiveId);
    if (prevObjective) {
      return prevObjective;
    } else if (nextFetchedObjective && nextFetchedObjective.get('id') === prevObjectiveId) {
      return nextFetchedObjective;
    }
    return null;
  }

  setMapObjective = objective => {
    this.setState({
      mapObjective: objective,
    });
  }

  handleMenuItemClick = (e, { name }) => {
    this.setState({
      activeItem: name,
    });
  }

  emptyViewHtml() {
    return (
      <Segment compact padded='very' textAlign='center' className='empty-view'>
        <Header as='h4'>Objective がありません</Header>
        <Button icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveFormModal} />
      </Segment>
    );
  }

  render() {
    let activeItem = this.state.activeItem;
    if (this.props.objectives.size > 0 && this.props.keyResults.size === 0) {
      activeItem = 'objective';
    } else if (this.props.objectives.size === 0 && this.props.keyResults.size > 0 && this.props.isFetched) {
      activeItem = 'keyResult';
    }
    return (
      <div className="dashboard">
        <section className="okr-list-section">
          <div className='okr-list-section__menu'>
            <Menu tabular>
              <Menu.Item name='objective' active={activeItem === 'objective'} onClick={this.handleMenuItemClick}>
                Objective ({this.props.objectives.size})
              </Menu.Item>
              <Menu.Item name='keyResult' active={activeItem === 'keyResult'} onClick={this.handleMenuItemClick}>
                Key Result ({this.props.keyResults.size})
              </Menu.Item>
              <Menu.Item>
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveFormModal} />
              </Menu.Item>
            </Menu>
          </div>
          {activeItem === 'objective'
            ? <ObjectiveList objectives={this.props.objectives}
                             onClick={objective => this.setMapObjective(objective)} />
            : <KeyResultList keyResults={this.props.keyResults}
                             onClick={keyResult => this.setMapObjective(keyResult.get('objective'))} />
          }
        </section>
        <section className='okr-map-section'>
          <div className='okr-map-section__menu'>
            <Menu tabular compact>
              <Menu.Item header>OKR マップ</Menu.Item>
            </Menu>
          </div>
          {this.state.mapObjective
            ? <OkrMap objective={this.state.mapObjective} />
            : this.props.isFetched && this.emptyViewHtml()
          }
        </section>
      </div>
    );
  }
}
