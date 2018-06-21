import { connect } from 'react-redux';
import SignUpPage from '../components/signin/SignUpPage';
import organizationActions from '../actions/organizations';

const mapStateToProps = (state) => {
  return {
    isCompleted: state.organizations.get('isCompleted'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addOrganization(organization, user, okrPeriod) {
      dispatch(organizationActions.addOrganization(organization, user, okrPeriod));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage);
