import LogoModal from '../components/modal/LogoModal';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import organizationActions from '../actions/organizations';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['logoImage', 'isOpen']),
    imageData: state.dialogs.getIn(['logoImage', 'imageData']),
    targetId: state.organizations.get('selected').get('id'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadLogoImage: (id, logo) => {
      dispatch(organizationActions.updateLogo({id, logo}));
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