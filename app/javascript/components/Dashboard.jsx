import React, { Component } from 'react';
import { Menu, Button, Segment, Header } from 'semantic-ui-react';
import ObjectiveList from '../components/ObjectiveList';
import KeyResultList from '../components/KeyResultList';
import OkrMap from '../containers/OkrMap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
      selectedObjective: null,
      selectedKeyResult: null,
      activeItem: 'objective',
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
      this.setState({
        isFetched: false,
      });
    } else if (this.props.objectives !== nextProps.objectives) {
      // Objective 一覧取得時や追加/削除時は最初の Objective を選択する
      this.selectObjective(nextProps.objectives.first());
      if (!this.state.isFetched) {
        this.props.fetchKeyResults(nextOkrPeriodId, nextUserId);
        this.setState({
          isFetched: true,
        });
      }
    }
  }

  selectObjective = objective => {
    this.setState({
      selectedObjective: objective,
      selectedKeyResult: null,
    });
  }

  selectKeyResult = keyResult => {
    this.setState({
      selectedObjective: keyResult.get('objective'),
      selectedKeyResult: keyResult
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
    } else if (this.props.objectives.size === 0 && this.props.keyResults.size > 0) {
      activeItem = 'keyResult';
    }
    return (
      <div className="dashboard">
        <section className="okr-list-section">
          <div className='okr-list-section__menu'>
            <Menu tabular>
              <Menu.Item header>OKR 一覧</Menu.Item>
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
                             selectedObjective={this.state.selectedObjective}
                             onSelectObjective={this.selectObjective} />
            : <KeyResultList keyResults={this.props.keyResults}
                             selectedKeyResult={this.state.selectedKeyResult}
                             onSelectKeyResult={this.selectKeyResult} />
          }
        </section>
        <section className='okr-map-section'>
          <div className='okr-map-section__menu'>
            <Menu tabular compact>
              <Menu.Item header>OKR マップ</Menu.Item>
            </Menu>
          </div>
          {this.state.selectedObjective
            ? <OkrMap objective={this.state.selectedObjective} />
            : this.state.isFetched && this.emptyViewHtml()
          }
        </section>
      </div>
    );
  }
}
