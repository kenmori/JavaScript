import OkrMap from '../components/OkrMap';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    objectives: state.objectives,
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
