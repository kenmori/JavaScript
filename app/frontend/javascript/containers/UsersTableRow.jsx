import { connect } from "react-redux";
import UsersTableRow from "../components/setting/UsersTableRow";
import organizationActions from "../actions/organization";
import userActions from "../actions/users";
import dialogActions from "../actions/dialogs";

const mapStateToProps = state => ({
  organizationId: state.organization.getIn(["current", "id"]),
});

const mapDispatchToProps = dispatch => ({
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
)(UsersTableRow);
