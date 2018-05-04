import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { List } from 'semantic-ui-react';

class ObjectiveSidebar extends Component {

  render() {
    const { parentKeyResult } = this.props;
    if (!parentKeyResult) return null;
    return (
      <div className="objective-modal__sidebar">
        <div className="sidebar__item">
          <div className="sidebar__title">上位 Objective</div>
          <div className="sidebar__content">
            <List>
              <List.Item>
                <List.Content>
                  <List.Header>{parentKeyResult.getIn(['objective', 'name'])}</List.Header>
                  <List.Description>{parentKeyResult.getIn(['objective', 'description'])}</List.Description>
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
                  <List.Header>{parentKeyResult.get('name')}</List.Header>
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
  parentKeyResult: PropTypes.object,
};

export default ObjectiveSidebar;
