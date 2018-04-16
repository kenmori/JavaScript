import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu, Label } from 'semantic-ui-react';
import ObjectivePane from './ObjectivePane';

class ObjectiveTab extends Component {

  render() {
    const dummyLabel = <Label className='zero-width'>&nbsp;</Label>; // Label 付きタブと高さを合わせるためのダミー Label
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='objective'>Objective{dummyLabel}</Menu.Item>,
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
