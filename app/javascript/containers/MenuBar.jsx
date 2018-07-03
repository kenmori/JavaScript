import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import organizationActions from '../actions/organizations'
import objectiveActions from '../actions/objectives'
import userActions from '../actions/users';
import currentActions from '../actions/current';
import deviseActions from '../actions/devise';
import history from '../utils/history';
import { getEnabledUsers } from '../utils/selector'

const mapStateToProps = (state) => {
  return {
    organizationId: state.organizations.get('selected').get('id'),
    ownerId: state.organizations.get('ownerId'),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    organizations: state.organizations.get('list'),
    okrPeriods: state.okrPeriods,
    users: getEnabledUsers(state),
    organization: state.organizations.get('selected'),
    loginUser: state.loginUser,
    isFetchedOrganization: state.organizations.get('isFetched'),
    needLogout: state.devise.get('needLogout'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganization: id => {
      dispatch(organizationActions.fetchOrganization(id))
    },
    fetchOkrs: (okrPeriodId, userId) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId))
    },
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
    changeCurrentOrganizationId: (id, organizationId) => {
      dispatch(userActions.updateCurrentOrganizationId({id, organizationId}));
      setTimeout(() => {
        location.href = '/';
      }, 300);
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
