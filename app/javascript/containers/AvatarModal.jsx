import AvatarModal from '../components/modal/AvatarModal';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';
import usersActions from '../actions/users';

const mapStateToProps = (state) => {
  return {
    isOpen: state.dialogs.getIn(['avatarImage', 'isOpen']),
    imageData: state.dialogs.getIn(['avatarImage', 'imageData']),
    targetId: state.dialogs.getIn(['avatarImage', 'targetId']),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    uploadAvatarImage: (id, avatar) => {
      dispatch(usersActions.updateAvatar({id, avatar}));
    },
    closeModal: () => {
      dispatch(dialogActions.closeAvatarModal());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AvatarModal);