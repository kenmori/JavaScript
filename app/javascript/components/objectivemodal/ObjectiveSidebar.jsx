import React, { PureComponent } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { List } from 'semantic-ui-react';
import OkrName from '../util/OkrName'

class ObjectiveSidebar extends PureComponent {

  render() {
    const { parentKeyResult } = this.props;
    if (!parentKeyResult) return null;
    const parentObjective = parentKeyResult.get('objective')
    return (
      <div className="objective-modal__sidebar">
        <div className="sidebar__item">
          <div className="sidebar__title">上位 Objective</div>
          <div className="sidebar__content">
            <List>
              <List.Item>
                <List.Content>
                  <List.Header><OkrName okr={parentObjective} /></List.Header>
                  <List.Description>{parentObjective.get('description')}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </div>
        <div className="sidebar__item">
          <div className="sidebar__title">上位 Key Result</div>
          <div className="sidebar__content">
            <List>
              <List.Item>
                <List.Content>
                  <List.Header><OkrName okr={parentKeyResult} /></List.Header>
                  <List.Description>{parentKeyResult.get('description')}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </div>
      </div>
    );
  }
}

ObjectiveSidebar.propTypes = {
  // container
  // component
  parentKeyResult: ImmutablePropTypes.map,
};

export default ObjectiveSidebar;
