import { connect } from 'react-redux'
import SignUpPage from '../components/signin/SignUpPage'
import organizationActions from '../actions/organization'
import queryString from 'query-string'

const isValidToken = token => {
  // URL を推測した第三者による意図しないユーザー登録を簡易的に避けるためトークンの有無をチェックする
  return !!token && token.length >= 8 // 8文字以上であれば OK とする (中身は何でも良い)
}

const mapStateToProps = (state, { location }) => {
  const query = queryString.parse(location.search)
  return {
    hasValidToken: isValidToken(query.registration_token),
    isCompleted: state.organization.get('isCompleted'),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addOrganization(organization, user, okrPeriod) {
      dispatch(organizationActions.addOrganization(organization, user, okrPeriod))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpPage)
