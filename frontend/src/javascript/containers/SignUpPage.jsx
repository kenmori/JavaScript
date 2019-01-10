import { connect } from "react-redux";
import qs from "qs";
import SignUpPage from "../components/signin/SignUpPage";
import organizationActions from "../actions/organization";

const isValidToken = token =>
  // URL を推測した第三者による意図しないユーザー登録を簡易的に避けるためトークンの有無をチェックする
  !!token && token.length >= 8; // 8文字以上であれば OK とする (中身は何でも良い)

const mapStateToProps = (state, { location }) => {
  const query = qs.parse(location.search, { ignoreQueryPrefix: true });
  return {
    hasValidToken: isValidToken(query.registration_token),
    isCompleted: state.organization.get("isCompleted"),
  };
};

const mapDispatchToProps = dispatch => ({
  addOrganization(organization, user, okrPeriod) {
    dispatch(
      organizationActions.addOrganization(organization, user, okrPeriod),
    );
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpPage);
