import { connect } from "react-redux";
import OptionModal from "../components/modal/OptionModal";
import loginUserActions from "../actions/loginUser";
import dialogActions from "../actions/dialogs";

const mapStateToProps = state => ({
  isOpen: state.dialogs.getIn(["option", "isOpen"]),
  userSetting: state.loginUser.get("userSetting"),
});

const mapDispatchToProps = dispatch => ({
  updateUserSetting: userSetting => {
    dispatch(loginUserActions.updateUserSetting(userSetting));
  },
  closeModal: () => {
    dispatch(dialogActions.closeOptionModal());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionModal);
