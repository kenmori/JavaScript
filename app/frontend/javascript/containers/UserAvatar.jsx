import { connect } from "react-redux";
import UserAvatar from "../components/util/UserAvatar";
import dialogActions from "../actions/dialogs";

const mapStateToProps = state => ({
  isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
});

const mapDispatchToProps = dispatch => ({
  openImageModal: (id, data) => {
    dispatch(dialogActions.openImageModal(id, data));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserAvatar);
