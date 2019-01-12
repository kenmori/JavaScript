import { connect } from "react-redux";
import KeyResultInfoPane from "../components/okrmodal/KeyResultInfoPane";
import keyResultActions from "../actions/keyResults";

const mapStateToProps = (state, { keyResult }) => ({
  isKeyResultOwner:
    keyResult.getIn(["owner", "id"]) === state.loginUser.get("id"),
});

const mapDispatchToProps = dispatch => ({
  disableKeyResult: keyResult => {
    dispatch(
      keyResultActions.disableKeyResult(
        keyResult.get("id"),
        !keyResult.get("disabled"),
      ),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KeyResultInfoPane);
