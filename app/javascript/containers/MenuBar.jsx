import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import okrPeriodActions from '../actions/okrPeriods';
import menuActions from '../actions/menu';
import sessionActions from '../actions/sessions';

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
      dispatch(menuActions.changeUser(userId));
    },
    changeOkrPeriod: (okrPeriodId) => {
      dispatch(menuActions.changeOkrPeriod(okrPeriodId));
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
