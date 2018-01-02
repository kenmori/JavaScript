import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import okrPeriodActions from '../actions/okrPeriods';
import menuActions from '../actions/menu';
import sessionActions from '../actions/sessions';
import history from '../utils/history';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    menu: state.menu,
    okrPeriods: state.okrPeriods,
    loginUser: state.loginUser,
    organization: state.organizations.get('selected'),
    organizations: state.organizations.get('list'),
    needLogout: state.signUp.get('needLogout'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    },
    fetchOkrPeriods: (organizationId) => {
      dispatch(okrPeriodActions.fetchOkrPeriods(organizationId));
    },
    changeUser: (userId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(menuActions.changeUser(userId));
    },
    changeOkrPeriod: (okrPeriodId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(menuActions.changeOkrPeriod(okrPeriodId));
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
