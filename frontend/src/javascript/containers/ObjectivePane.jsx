import { connect } from "react-redux";
import ObjectivePane from "../components/okrmodal/ObjectivePane";
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
)(ObjectivePane);
