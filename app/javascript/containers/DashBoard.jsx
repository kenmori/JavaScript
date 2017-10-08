import DashBoard from '../components/DashBoard';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    loginUser: state.currentUser,
  };
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashBoard);
