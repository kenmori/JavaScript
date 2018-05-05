import Home from '../components/Home';
import { connect } from 'react-redux';
import organizationActions from '../actions/organizations'
import objectiveActions from '../actions/objectives'
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state, { match: { params } }) => {
  return {
    organization: state.organizations.get('selected'),
    okrPeriodId: state.current.get('okrPeriodId'),
    userId: state.current.get('userId'),
    okrHash: params.okrHash,
    isOpenOkrModal: state.dialogs.getIn(['okrForm', 'isOpen']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchOrganization: id => {
      dispatch(organizationActions.fetchOrganization({id}))
    },
    fetchOkrs: (okrPeriodId, userId, isOkrPeriodChanged = true) => {
      dispatch(objectiveActions.fetchOkrs(okrPeriodId, userId, isOkrPeriodChanged))
    },
    openOkrModal: (objectiveId, keyResultId) => {
      dispatch(dialogActions.openOkrModal(objectiveId, keyResultId));
    },
    closeOkrModal: () => {
      dispatch(dialogActions.closeOkrModal());
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
