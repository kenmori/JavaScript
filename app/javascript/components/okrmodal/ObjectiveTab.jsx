import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu, Label } from 'semantic-ui-react';
import ObjectivePane from './ObjectivePane';
import LinkPane from './LinkPane';

class ObjectiveTab extends Component {

  render() {
    const dummyLabel = <Label className='zero-width'>&nbsp;</Label>; // Label 付きタブと高さを合わせるためのダミー Label
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='objective'>Objective{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane><ObjectivePane {...this.props} /></Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='links'>紐付き{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane><LinkPane {...this.props} /></Tab.Pane>
        },
      ]} />
    );
  }
}

ObjectiveTab.propTypes = {
  objective: PropTypes.object.isRequired,
  parentKeyResultCandidates: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ObjectiveTab;
