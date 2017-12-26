import SettingsPage from '../components/SettingsPage';
import { connect } from 'react-redux';
import history from '../utils/history';

const mapStateToProps = (state, {match}) => {
  return {
    name: match.params.name,
    isAdmin: state.loginUser.get('isAdmin'),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeURL: (url) => {
      history.push(url);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
