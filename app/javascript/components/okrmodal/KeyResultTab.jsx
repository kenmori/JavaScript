import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu, Label } from 'semantic-ui-react';
import KeyResultPane from './KeyResultPane';
import CommentPane from './CommentPane';

class KeyResultTab extends Component {

  render() {
    const count = this.props.keyResult.get('comments').size;
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='keyResult'>Key Result</Menu.Item>,
          render: () => <Tab.Pane><KeyResultPane {...this.props} /></Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='comments'>コメント<Label>{count}</Label></Menu.Item>,
          render: () => <Tab.Pane><CommentPane {...this.props} /></Tab.Pane>
        },
      ]} />
    );
  }
}

KeyResultTab.propTypes = {
  keyResult: PropTypes.object,
  users: PropTypes.object,
  updateKeyResult: PropTypes.func,
  removeKeyResult: PropTypes.func,
  changeToObjectiveModal: PropTypes.func,
};

export default KeyResultTab;
