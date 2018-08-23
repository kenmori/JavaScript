import Loading from '../components/util/Loading'
import { connect } from 'react-redux'

const mapStateToProps = (state) => {
  return {
    isOpened: state.loading.get('isOpened'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Loading)
