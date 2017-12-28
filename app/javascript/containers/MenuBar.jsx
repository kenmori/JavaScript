import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import organizationActions from '../actions/organizations';
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
    fetchOrganization: (id) => {
      dispatch(organizationActions.fetchOrganization({id}));
    },
    changeUser: (userId) => {
      dispatch(menuActions.changeUser(userId));
    },
    changeOkrPeriod: (okrPeriodId) => {
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
