import OkrMap from '../components/OkrMap';
import { connect } from 'react-redux';
import { denormalizeObjectives } from "../schemas";

const mapStateToProps = (state) => {
  return {
    objectives: denormalizeObjectives(state),
    users: state.users,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap);
