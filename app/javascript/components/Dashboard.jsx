import React, { Component } from 'react';
import { Menu, Button, Segment, Header } from 'semantic-ui-react';
import OkrList from '../containers/OkrList';
import OkrMap from '../containers/OkrMap';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFetched: false,
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
    } else if (this.props.objectives !== nextProps.objectives) {
      // Objective 一覧取得時や追加/削除時は最初の Objective を選択する
      this.selectObjective(nextProps.objectives.first());
      this.setState({
        isFetched: true,
      });
    }
  }

  selectObjective = objective => {
    this.setState({
      selectedObjectiveId: objective ? objective.get('id') : null,
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
    const selectedObjective = this.props.objectives.find((objective) => objective.get('id') === this.state.selectedObjectiveId);
    return (
      <div className="dashboard">
        <section className="okr-list-section">
          <div className='okr-list-section__menu'>
            <Menu compact secondary pointing>
              <Menu.Item header>OKR 一覧</Menu.Item>
              <Menu.Item active>Objective ({this.props.objectives.size})</Menu.Item>
              <Menu.Item>Key Result (0)</Menu.Item>
              <Menu.Item>
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveFormModal} />
              </Menu.Item>
            </Menu>
          </div>
          <OkrList objectives={this.props.objectives}
                   selectedObjective={selectedObjective}
                   onSelect={this.selectObjective} />
        </section>
        <section className='okr-map-section'>
          <div className='okr-map-section__menu'>
            <Menu compact secondary pointing>
              <Menu.Item header>OKR マップ</Menu.Item>
            </Menu>
          </div>
          {selectedObjective
            ? <OkrMap objective={selectedObjective} />
            : this.state.isFetched && this.emptyViewHtml()
          }
        </section>
      </div>
    );
  }
}
