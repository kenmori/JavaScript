import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import organizationActions from '../actions/organizations'
import objectiveActions from '../actions/objectives'
import userActions from '../actions/users';
import currentActions from '../actions/current';
import sessionActions from '../actions/sessions';
import history from '../utils/history';

const mapStateToProps = (state) => {
  return {
    organizationId: state.organizations.get('selected').get('id'),
    isFetchedOrganization: state.organizations.get('isFetched'),
    users: state.users.filter(user => !user.get('disabled')),
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
    fetchOrganization: id => {
      dispatch(organizationActions.fetchOrganization(id))
    },
    fetchOkrs: (okrPeriodId, userId, isOkrPeriodChanged = true) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, isOkrPeriodChanged))
    },
    changeCurrentUser: (userId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.changeCurrentUser(userId));
    },
    changeCurrentOkrPeriod: (okrPeriodId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.changeCurrentOkrPeriod(okrPeriodId));
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
