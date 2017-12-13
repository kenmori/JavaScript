import Avatar from '../components/Avatar';
import { connect } from 'react-redux';
import dialogActions from '../actions/dialogs';

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    openAvatarImageModal: (targetId, imageData) => {
      dispatch(dialogActions.openAvatarImageModal(targetId, imageData));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Avatar);
