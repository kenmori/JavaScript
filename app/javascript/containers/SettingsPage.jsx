import SettingsPage from '../components/SettingsPage';
import { connect } from 'react-redux';
import history from '../utils/history';

const mapStateToProps = (state, {match}) => {
  return {
    name: match.params.name
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
