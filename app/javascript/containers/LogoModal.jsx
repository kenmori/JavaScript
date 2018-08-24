import LogoModal from '../components/modal/LogoModal';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import organizationActions from '../actions/organization';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['logoImage', 'isOpen']),
    imageData: state.dialogs.getIn(['logoImage', 'imageData']),
    targetId: state.organization.get('current').get('id'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateLogo: (id, logo) => {
      dispatch(organizationActions.updateOrganization({id, logo}));
    },
    closeModal: () => {
      dispatch(dialogActions.closeLogoModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LogoModal);