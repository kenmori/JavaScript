import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import userActions from '../actions/users';
import okrPeriodActions from '../actions/okrPeriods';
import sessionActions from '../actions/sessions';

const mapStateToProps = (state) => {
  return {
    users: state.users,
    menu: state.menu,
    okrPeriods: state.okrPeriods,
    loginUser: state.loginUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchUsers: () => {
      dispatch(userActions.fetchUsers());
    },
    fetchOkrPeriods: () => {
      dispatch(okrPeriodActions.fetchOkrPeriods());
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
