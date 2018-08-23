import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import currentActions from '../actions/current';
import deviseActions from '../actions/devise';
import history from '../utils/history';
import { getEnabledUsers } from '../utils/selector'

const mapStateToProps = (state) => {
  return {
    ownerId: state.organizations.get('ownerId'),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    okrPeriods: state.okrPeriods,
    users: getEnabledUsers(state),
    organization: state.organizations.get('selected'),
    loginUser: state.loginUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    selectUser: (userId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.selectUser(userId));
    },
    selectOkrPeriod: (okrPeriodId) => {
      if (location.pathname !== '/') {
        history.push('/');
      }
      dispatch(currentActions.selectOkrPeriod(okrPeriodId));
    },
    signOut: () => {
      dispatch(deviseActions.signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
