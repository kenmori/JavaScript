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
      activeItem: props.activeItem,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.mapObjective !== nextProps.mapObjective && nextProps.isFetchedObjective) {
      this.setState({
        mapObjective: nextProps.mapObjective,
      });
    }
    if (this.props.activeItem !== nextProps.activeItem) {
      this.setState({ activeItem: nextProps.activeItem })
    }
  }

  handleMenuItemClick = (e, { name }) => this.setState({ activeItem: name })

  getActiveItem = () => {
    const { unprocessedKeyResults } = this.props
    const { activeItem } = this.state
    // activeItem やタスク KR がない場合に適切な activeItem を返す
    return unprocessedKeyResults.isEmpty()
      ? (activeItem && activeItem !== OkrTypes.TASK) ? activeItem : OkrTypes.OBJECTIVE
      : activeItem ? activeItem : OkrTypes.TASK
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
      case OkrTypes.TASK:
        return <TaskList keyResults={this.props.unprocessedKeyResults} />
      case OkrTypes.OBJECTIVE:
        return <ObjectiveList objectives={this.props.objectives} />
      case OkrTypes.KEY_RESULT:
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
              {!this.props.unprocessedKeyResults.isEmpty() && (
                <Menu.Item name={OkrTypes.TASK} active={activeItem === OkrTypes.TASK} onClick={this.handleMenuItemClick}>
                  タスク<Label>{this.props.unprocessedKeyResults.size}</Label>
                </Menu.Item>
              )}
              <Menu.Item name={OkrTypes.OBJECTIVE} active={activeItem === OkrTypes.OBJECTIVE} onClick={this.handleMenuItemClick}>
                Objective<Label>{this.props.objectives.size}</Label>
              </Menu.Item>
              <Menu.Item name={OkrTypes.KEY_RESULT} active={activeItem === OkrTypes.KEY_RESULT} onClick={this.handleMenuItemClick}>
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
  activeItem: PropTypes.string,
  openObjectiveModal: PropTypes.func.isRequired,
  openOptionModal: PropTypes.func.isRequired,
  // component
}

export default Dashboard
