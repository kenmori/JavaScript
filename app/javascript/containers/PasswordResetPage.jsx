import PasswordResetPage from '../components/signin/PasswordResetPage'
import { connect } from 'react-redux'
import deviseActions from '../actions/devise'

const mapStateToProps = (state, { location }) => {
  return {
    email: location.state && location.state.email,
    isCompleted: state.devise.get('isResetPasswordCompleted'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sendEmail(email) {
      dispatch(deviseActions.resetPassword({ email }))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PasswordResetPage)