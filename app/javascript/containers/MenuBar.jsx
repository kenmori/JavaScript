import MenuBar from '../components/MenuBar';
import { connect } from 'react-redux';
import sessionActions from '../actions/sessions';

const mapStateToProps = (_state) => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
    signOut: () => {
      dispatch(sessionActions.signOut());
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MenuBar);
