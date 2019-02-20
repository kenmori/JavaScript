import { connect } from "react-redux";
import UserSettingTab from "../../../components/organisms/UserSettingTab";
import userActions from "../../../actions/users";
import dialogActions from "../../../actions/dialogs";
import organizationActions from "../../../actions/organization";
import {
  getEnabledUsersForSetting,
  getDisabledUsersForSetting,
} from "../../../utils/selector";

const mapStateToProps = state => ({
  loginUserId: state.loginUser.get("id"),
  organization: state.organization.get("current"),
  organizationId: state.organization.getIn(["current", "id"]),
  enabledUsers: getEnabledUsersForSetting(state),
  disabledUsers: getDisabledUsersForSetting(state),
});

const mapDispatchToProps = dispatch => ({
  addUser: user => {
    dispatch(userActions.addUser(user));
  },
  updateUser: user => {
    dispatch(userActions.updateUser(user));
  },
  updateEmail: (id, email) => {
    dispatch(userActions.updateUser({ id, email }));
  },
  resendEmail: id => {
    dispatch(userActions.resendEmail(id));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
  setOrganizationOwner: (organizationId, user) => {
    dispatch(
      organizationActions.updateOrganizationOwner(
        organizationId,
        user.get("id"),
      ),
    );
  },
  disableUser: user => {
    dispatch(userActions.disableUser(user.get("id"), !user.get("disabled")));
  },
  confirm: params => {
    dispatch(dialogActions.openConfirmModal(params));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserSettingTab);
