import { connect } from "react-redux";
import KeyResultPane from "../components/okrmodal/KeyResultPane";

const mapStateToProps = (state, { keyResult }) => ({
  isKeyResultOwner:
    keyResult.getIn(["owner", "id"]) === state.loginUser.get("id"),
});

export default connect(mapStateToProps)(KeyResultPane);
