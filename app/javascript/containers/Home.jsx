import Home from '../components/Home'
import { connect } from 'react-redux'

const mapStateToProps = (state, { match: { params } }) => {
  return {
    okrHash: params.okrHash,
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
