import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';

class OrganizationSettingTab extends Component {
  render() {
    return (
      <Tab.Pane attached={false} className="user-setting-tab">
        組織タブ
      </Tab.Pane>
    );
  }
}

OrganizationSettingTab.propTypes = {

};

export default OrganizationSettingTab;
