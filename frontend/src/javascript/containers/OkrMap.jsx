import { connect } from "react-redux";
import OkrMap from "../components/map/OkrMap";
import { getMapObjective } from "../utils/selector";

const mapStateToProps = state => ({
  objective: getMapObjective(state),
  mapOkr: state.current.get("mapOkr"),
  scrollToObjectiveId: state.current.get("scrollToObjectiveId"),
});

const mapDispatchToProps = () => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OkrMap);
