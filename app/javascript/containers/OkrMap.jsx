import OkrMap from '../components/map/OkrMap'
import { connect } from 'react-redux'
import { getMapObjective } from '../utils/selector'

const mapStateToProps = state => {
  return {
    objective: getMapObjective(state),
    mapOkr: state.current.get('mapOkr'),
    scrollToObjectiveId: state.current.get('scrollToObjectiveId'),
  }
}

const mapDispatchToProps = () => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OkrMap)
