import DashBoard from '../components/DashBoard';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    loginUser: state.loginUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
