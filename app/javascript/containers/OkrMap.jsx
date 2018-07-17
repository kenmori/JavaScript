import OkrMap from '../components/map/OkrMap';
import { connect } from 'react-redux';
import { getMapObjective } from '../utils/selector'

const mapStateToProps = state => {
  return {
    objective: getMapObjective(state),
    mapOkr: state.current.get('mapOkr'),
  }
};

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap);
