import React, { Component } from 'react';
import { Menu, Button, Segment, Header } from 'semantic-ui-react';
import ObjectiveList from '../../containers/ObjectiveList';
import KeyResultList from '../../containers/KeyResultList';
import OkrMap from '../../containers/OkrMap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapObjective: null,
      mapObjectiveId: null,
      activeItem: 'objective',
    };
  }

  componentDidMount() {
    this.props.fetchOkrs(this.props.okrPeriodId, this.props.userId, this.props.isAdmin);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.okrPeriodId !== nextProps.okrPeriodId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId, this.props.isAdmin);
    } else if (this.props.userId !== nextProps.userId) {
      this.props.fetchOkrs(nextProps.okrPeriodId, nextProps.userId, false);
    } else if (this.props.fetchedObjectiveId !== nextProps.fetchedObjectiveId) {
      const objective = this.getCurrentMapObjective(nextProps.objectives, nextProps.keyResults, nextProps.fetchedObjective);
      if (objective) {
        this.setMapObjective(objective);
      }
    } else if (!this.props.objectiveIds.equals(nextProps.objectiveIds)) {
      const objective = this.getNextMapObjective(this.props.objectives, nextProps.objectives);
      this.setMapObjective(objective);
      if (objective) {
        this.props.changeCurrentOkr(objective.get('id'));
      }
    } else if (this.props.entities !== nextProps.entities) {
      const objective = this.getCurrentMapObjective(nextProps.objectives, nextProps.keyResults);
      if (objective) {
        this.setMapObjective(objective);
      }
    }
  }

  getNextMapObjective = (prevObjectives, nextObjectives) => {
    // Objective 一覧取得時や追加/削除時に選択する Objective を返す
    const prevObjectiveId = this.state.mapObjectiveId;
    const nextObjective = nextObjectives.first();
    if (!prevObjectiveId) {
      return nextObjective; // 未選択の場合
    }
    const prevObjective = nextObjectives.find(objective => objective.get('id') === prevObjectiveId);
    if (!prevObjective) {
      return nextObjective; // 前回の選択 Objective が存在しない場合
    }
    if (prevObjectives.size < nextObjectives.size) {
      const findParent = (objective, parentId) => {
        const parent = objective.get('parentObjective');
        return parent
          ? parent.get('id') === parentId ? true : findParent(parent, parentId)
          : false;
      }
      if (!findParent(nextObjective, prevObjectiveId)) {
        return nextObjective; // 追加された Objective の祖先に選択中の Objective がいない場合 (新規作成)
      }
    }
    return prevObjective; // 選択状態は変えない (別インスタンス)
  }

  getCurrentMapObjective = (nextObjectives, nextKeyResults, nextFetchedObjective = null) => {
    // 現在選択中の Objective を nextProps の中から探して返す
    const prevObjectiveId = this.state.mapObjectiveId;
    if (nextFetchedObjective && nextFetchedObjective.get('id') === prevObjectiveId) {
      return nextFetchedObjective; // 選択 Objective を fetch した場合
    }
    let prevObjective = nextObjectives.find(objective => objective.get('id') === prevObjectiveId);
    if (!prevObjective) {
      const prevKeyResult = nextKeyResults.find(keyResult => keyResult.get('objectiveId') === prevObjectiveId);
      if (prevKeyResult) {
        prevObjective = prevKeyResult.get('objective');
      }
    }
    return prevObjective;
  }

  setMapObjective = objective => {
    this.setState({
      mapObjective: objective,
      mapObjectiveId: objective && objective.get('id'),
    });
  }

  setMapObjectiveId = objectiveId => {
    this.setState({
      mapObjectiveId: objectiveId,
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
        <Button icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
      </Segment>
    );
  }

  render() {
    let activeItem = this.state.activeItem;
    if (this.props.objectives.size > 0 && this.props.keyResults.size === 0) {
      activeItem = 'objective';
    } else if (this.props.objectives.size === 0 && this.props.keyResults.size > 0 && this.props.isFetchedObjectives) {
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
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
              </Menu.Item>
            </Menu>
          </div>
          {activeItem === 'objective'
            ? <ObjectiveList objectives={this.props.objectives}
                             setMapObjective={this.setMapObjective} />
            : <KeyResultList keyResults={this.props.keyResults}
                             setMapObjective={this.setMapObjective}
                             setMapObjectiveId={this.setMapObjectiveId} />
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
            : this.props.isFetchedObjectives && this.emptyViewHtml()
          }
        </section>
      </div>
    );
  }
}
