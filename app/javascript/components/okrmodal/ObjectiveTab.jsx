import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu } from 'semantic-ui-react';
import ObjectivePane from './ObjectivePane';

class ObjectiveTab extends Component {

  render() {
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='objective'>Objective</Menu.Item>,
          render: () => <Tab.Pane><ObjectivePane {...this.props} /></Tab.Pane>
        },
      ]} />
    );
  }
}

ObjectiveTab.propTypes = {
  objective: PropTypes.object,
  users: PropTypes.object,
  removeObjective: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
};

export default ObjectiveTab;
