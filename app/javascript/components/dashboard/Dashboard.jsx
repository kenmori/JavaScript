import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Menu, Button, Segment, Header, Label } from 'semantic-ui-react';
import TaskList from '../../containers/TaskList'
import ObjectiveList from '../../containers/ObjectiveList';
import KeyResultList from '../../containers/KeyResultList';
import OkrMap from '../../containers/OkrMap';

class Dashboard extends PureComponent {

  static ITEM_TASK = 'task'
  static ITEM_OBJECTIVE = 'objective'
  static ITEM_KEY_RESULT = 'keyResult'

  constructor(props) {
    super(props);
    this.state = {
      mapObjective: props.mapObjective,
      activeItem: Dashboard.ITEM_TASK,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapObjective !== nextProps.mapObjective && nextProps.isFetchedObjective) {
      this.setState({
        mapObjective: nextProps.mapObjective,
      });
    }
    if (!this.props.isFetchedKeyResults && nextProps.isFetchedKeyResults && !nextProps.showTask) {
      if (!nextProps.objectives.size && nextProps.keyResults.size) {
        this.setActiveItem(Dashboard.ITEM_KEY_RESULT) // O = 0 かつ KR > 0 => KR タブ選択
      } else if (!nextProps.keyResults.size) {
        this.setActiveItem(Dashboard.ITEM_OBJECTIVE) //  KR = 0 => O タブ選択
      }
    }
  }

  handleMenuItemClick = (e, { name }) => {
    if ((name === Dashboard.ITEM_OBJECTIVE && !this.props.objectives.size)
      || (name === Dashboard.ITEM_KEY_RESULT && !this.props.keyResults.size)) {
      return
    }
    this.setActiveItem(name)
  }

  getActiveItem = () => {
    const { activeItem } = this.state
    return (activeItem === Dashboard.ITEM_TASK && !this.props.showTask) ? Dashboard.ITEM_OBJECTIVE : activeItem
  }

  setActiveItem = activeItem => {
    if (this.state.activeItem !== activeItem) {
      this.setState({ activeItem })
    }
  }

  emptyViewHtml() {
    return (
      <Segment compact padded='very' textAlign='center' className='empty-view'>
        <Header as='h4'>Objective がありません</Header>
        <Button icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
      </Segment>
    );
  }

  getTabContent = activeItem => {
    switch(activeItem) {
      case Dashboard.ITEM_TASK:
        return <TaskList keyResults={this.props.unprocessedKeyResults} />
      case Dashboard.ITEM_OBJECTIVE:
        return <ObjectiveList objectives={this.props.objectives} />
      case Dashboard.ITEM_KEY_RESULT:
        return <KeyResultList keyResults={this.props.keyResults} />
    }
  }

  render() {
    const activeItem = this.getActiveItem()
    return (
      <div className="dashboard">
        <section className="okr-list__section">
          <div className='okr-list__menu'>
            <Menu tabular>
              {this.props.showTask && (
                <Menu.Item name={Dashboard.ITEM_TASK} active={activeItem === Dashboard.ITEM_TASK} onClick={this.handleMenuItemClick}>
                  タスク<Label>{this.props.unprocessedKeyResults.size}</Label>
                </Menu.Item>
              )}
              <Menu.Item name={Dashboard.ITEM_OBJECTIVE} active={activeItem === Dashboard.ITEM_OBJECTIVE} onClick={this.handleMenuItemClick}>
                Objective<Label>{this.props.objectives.size}</Label>
              </Menu.Item>
              <Menu.Item name={Dashboard.ITEM_KEY_RESULT} active={activeItem === Dashboard.ITEM_KEY_RESULT} onClick={this.handleMenuItemClick}>
                Key Result<Label>{this.props.keyResults.size}</Label>
              </Menu.Item>
              <Menu.Item className="okr-list__button">
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
                <Button compact icon='setting' content='オプション' onClick={this.props.openOptionModal} />
              </Menu.Item>
            </Menu>
          </div>
          {this.getTabContent(activeItem)}
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
  unprocessedKeyResults: ImmutablePropTypes.list.isRequired,
  isFetchedObjective: PropTypes.bool.isRequired,
  isFetchedObjectives: PropTypes.bool.isRequired,
  isFetchedKeyResults: PropTypes.bool.isRequired,
  showTask: PropTypes.bool.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  openOptionModal: PropTypes.func.isRequired,
  // component
}

export default Dashboard
