import PasswordSetPage from '../components/signin/PasswordSetPage'
import { connect } from 'react-redux'
import deviseActions from '../actions/devise'
import queryString from 'query-string'

const mapStateToProps = (state, { location }) => {
  return {
    token: queryString.parse(location.search).confirmation_token,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPassword(password, passwordConfirmation, confirmationToken) {
      dispatch(deviseActions.setPassword({ password, passwordConfirmation, confirmationToken }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordSetPage)
