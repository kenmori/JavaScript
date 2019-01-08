import { connect } from "react-redux";
import ObjectiveInfoPane from "../components/okrmodal/ObjectiveInfoPane";
import objectiveActions from "../actions/objectives";

const mapStateToProps = state => ({
  isAdmin: state.loginUser.get("isAdmin"),
});

const mapDispatchToProps = dispatch => ({
  disableObjective: objective => {
    dispatch(
      objectiveActions.disableObjective(
        objective.get("id"),
        !objective.get("disabled"),
      ),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ObjectiveInfoPane);
