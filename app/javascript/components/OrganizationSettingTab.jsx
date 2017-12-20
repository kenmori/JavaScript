import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab } from 'semantic-ui-react';
import EditableText from './utils/EditableText';

class OrganizationSettingTab extends Component {
  render() {
    const user = this.props.user;
    const organization = this.props.organization;
    return (
      <Tab.Pane attached={false} className="organization-setting-tab">
        <dl>
          <dt>組織名</dt>
          <dd><EditableText value={organization.get('name')} saveValue={name => this.props.updateOrganization({id: user.get('id'), organizationName: name})}/></dd>
        </dl>
      </Tab.Pane>
    );
  }
}

OrganizationSettingTab.propTypes = {
  user: PropTypes.object,
  organization: PropTypes.object,
  updateOrganization: PropTypes.func
};

export default OrganizationSettingTab;
