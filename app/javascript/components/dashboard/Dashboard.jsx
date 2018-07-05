import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Menu, Button, Segment, Header, Label } from 'semantic-ui-react';
import TaskList from '../../containers/TaskList'
import ObjectiveList from '../../containers/ObjectiveList';
import KeyResultList from '../../containers/KeyResultList';
import OkrMap from '../../containers/OkrMap';
import { OkrTypes } from '../../utils/okr'

class Dashboard extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      mapObjective: props.mapObjective,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapObjective !== nextProps.mapObjective && nextProps.isFetchedObjective) {
      this.setState({
        mapObjective: nextProps.mapObjective,
      });
    }
  }

  handleMenuItemClick = (e, { name }) => this.props.selectTab(name)

  getSelectedTab = () => {
    const { selectedTab, taskKeyResults } = this.props
    // selectedTab = TASK でタスク KR がない場合を考慮
    return (selectedTab === OkrTypes.TASK && taskKeyResults.isEmpty()) ? OkrTypes.OBJECTIVE : selectedTab
  }

  emptyViewHtml() {
    return (
      <Segment compact padded='very' textAlign='center' className='empty-view'>
        <Header as='h4'>Objective がありません</Header>
        <Button icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
      </Segment>
    );
  }

  getTabContent = selectedTab => {
    switch(selectedTab) {
      case OkrTypes.TASK:
        return <TaskList keyResults={this.props.taskKeyResults} />
      case OkrTypes.OBJECTIVE:
        return <ObjectiveList objectives={this.props.objectives} />
      case OkrTypes.KEY_RESULT:
        return <KeyResultList keyResults={this.props.keyResults} />
    }
  }

  render() {
    const selectedTab = this.getSelectedTab()
    return (
      <div className="dashboard">
        <section className="okr-list__section">
          <div className='okr-list__menu'>
            <Menu tabular>
              {!this.props.taskKeyResults.isEmpty() && (
                <Menu.Item name={OkrTypes.TASK} active={selectedTab === OkrTypes.TASK} onClick={this.handleMenuItemClick}>
                  タスク<Label>{this.props.taskKeyResults.size}</Label>
                </Menu.Item>
              )}
              <Menu.Item name={OkrTypes.OBJECTIVE} active={selectedTab === OkrTypes.OBJECTIVE} onClick={this.handleMenuItemClick}>
                Objective<Label>{this.props.objectives.size}</Label>
              </Menu.Item>
              <Menu.Item name={OkrTypes.KEY_RESULT} active={selectedTab === OkrTypes.KEY_RESULT} onClick={this.handleMenuItemClick}>
                Key Result<Label>{this.props.keyResults.size}</Label>
              </Menu.Item>
              <Menu.Item className="okr-list__button">
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
                <Button compact icon='setting' content='オプション' onClick={this.props.openOptionModal} />
              </Menu.Item>
            </Menu>
          </div>
          {this.getTabContent(selectedTab)}
        </section>
        <section className='okr-map__section'>
          <div className='okr-map__menu'>
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

Dashboard.propTypes = {
  // container
  mapObjective: ImmutablePropTypes.map,
  objectives: ImmutablePropTypes.list.isRequired,
  keyResults: ImmutablePropTypes.list.isRequired,
  taskKeyResults: ImmutablePropTypes.list.isRequired,
  isFetchedObjective: PropTypes.bool.isRequired,
  isFetchedObjectives: PropTypes.bool.isRequired,
  selectedTab: PropTypes.string.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  openOptionModal: PropTypes.func.isRequired,
  selectTab: PropTypes.func.isRequired,
  // component
}

export default Dashboard
