import OkrMap from '../components/map/OkrMap';
import { connect } from 'react-redux';
import objectiveActions from '../actions/objectives';

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    fetchObjective: id => {
      dispatch(objectiveActions.fetchObjective(id));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap);
