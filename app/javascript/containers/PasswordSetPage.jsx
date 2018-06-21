import PasswordSetPage from '../components/signin/PasswordSetPage'
import { connect } from 'react-redux'
import deviseActions from '../actions/devise'
import queryString from 'query-string'

const mapStateToProps = (state, { location }) => {
  const query = queryString.parse(location.search)
  return {
    token: { resetPasswordToken: query.reset_password_token, confirmationToken: query.confirmation_token, }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setPassword(password, passwordConfirmation, token) {
      dispatch(deviseActions.setPassword({ password, passwordConfirmation, ...token }))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordSetPage)
