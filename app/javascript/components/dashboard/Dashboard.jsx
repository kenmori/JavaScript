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
      activeItem: Dashboard.ITEM_OBJECTIVE,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapObjective !== nextProps.mapObjective && nextProps.isFetchedObjective) {
      this.setState({
        mapObjective: nextProps.mapObjective,
      });
    }
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

  getTabContent() {
    switch(this.state.activeItem) {
      case Dashboard.ITEM_TASK:
        return <TaskList keyResults={this.props.keyResults} />
      case Dashboard.ITEM_OBJECTIVE:
        return <ObjectiveList objectives={this.props.objectives} />
      case Dashboard.ITEM_KEY_RESULT:
        return <KeyResultList keyResults={this.props.keyResults} />
    }
  }

  render() {
    let activeItem = this.state.activeItem;
    if (this.props.objectives.size > 0 && this.props.keyResults.size === 0) {
      activeItem = Dashboard.ITEM_OBJECTIVE;
    } else if (this.props.objectives.size === 0 && this.props.keyResults.size > 0 && this.props.isFetchedObjectives) {
      activeItem = Dashboard.ITEM_KEY_RESULT;
    }
    return (
      <div className="dashboard">
        <section className="okr-list-section">
          <div className='okr-list-section__menu'>
            <Menu tabular>
              <Menu.Item name={Dashboard.ITEM_TASK} active={activeItem === Dashboard.ITEM_TASK} onClick={this.handleMenuItemClick}>
                タスク<Label>{this.props.keyResults.size}</Label>
              </Menu.Item>
              <Menu.Item name={Dashboard.ITEM_OBJECTIVE} active={activeItem === Dashboard.ITEM_OBJECTIVE} onClick={this.handleMenuItemClick}>
                Objective<Label>{this.props.objectives.size}</Label>
              </Menu.Item>
              <Menu.Item name={Dashboard.ITEM_KEY_RESULT} active={activeItem === Dashboard.ITEM_KEY_RESULT} onClick={this.handleMenuItemClick}>
                Key Result<Label>{this.props.keyResults.size}</Label>
              </Menu.Item>
              <Menu.Item>
                <Button compact icon="plus" content='OKR を作成する' onClick={this.props.openObjectiveModal} />
              </Menu.Item>
            </Menu>
          </div>
          {this.getTabContent()}
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

Dashboard.propTypes = {
  // container
  mapObjective: ImmutablePropTypes.map,
  objectives: ImmutablePropTypes.list.isRequired,
  keyResults: ImmutablePropTypes.list.isRequired,
  isFetchedObjective: PropTypes.bool.isRequired,
  isFetchedObjectives: PropTypes.bool.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  // component
}

export default Dashboard
