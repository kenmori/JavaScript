import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import okrPeriodActions from '../actions/okrPeriods';
import sessionActions from '../actions/sessions';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    okrPeriod: state.okrPeriod,
    okrPeriods: state.okrPeriods,
    loginUser: state.loginUser,
    organization: state.organization,
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
    changeOkrPeriodId: (okrPeriodId) => {
      dispatch(okrPeriodActions.changeOkrPeriodId(okrPeriodId));
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
