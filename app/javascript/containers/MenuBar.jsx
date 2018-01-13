import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import organizationActions from '../actions/organizations';
import currentActions from '../actions/current';
import sessionActions from '../actions/sessions';
import history from '../utils/history';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    userId: state.current.get('userId'),
    okrPeriodId: state.current.get('okrPeriodId'),
    okrPeriods: state.okrPeriods,
    loginUser: state.loginUser,
    organization: state.organizations.get('selected'),
    organizations: state.organizations.get('list'),
    needLogout: state.signUp.get('needLogout'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganization: (id) => {
      dispatch(organizationActions.fetchOrganization({id}));
    },
    changeUser: (userId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.changeUser(userId));
    },
    changeOkrPeriod: (okrPeriodId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.changeOkrPeriod(okrPeriodId));
    },
    changeCurrentOrganizationId: (id, organizationId) => {
      dispatch(userActions.updateCurrentOrganizationId({id, organizationId}));
      setTimeout(() => {
        location.href = '/';
      }, 300);
    },
    signOut: () => {
      dispatch(sessionActions.signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
