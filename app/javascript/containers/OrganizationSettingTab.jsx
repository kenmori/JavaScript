import OrganizationSettingTab from '../components/OrganizationSettingTab';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    user: state.loginUser,
    organization: state.organizations.get('selected')
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateOrganization: () => {

    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationSettingTab);