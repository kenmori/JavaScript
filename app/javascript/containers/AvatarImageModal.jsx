import AvatarImageModal from '../components/AvatarImageModal';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['avatarImage', 'isOpen']),
    imageData: state.dialogs.getIn(['avatarImage', 'imageData'])
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAvatarImage: (imageData) => {
      console.log(imageData)
    },
    closeModal: () => {
      dispatch(dialogActions.closeAvatarImageModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarImageModal);