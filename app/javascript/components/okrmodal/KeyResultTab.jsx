import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Tab, Menu, Label } from 'semantic-ui-react';
import KeyResultPane from './KeyResultPane';
import LinkPane from './LinkPane';
import CommentPane from './CommentPane';

class KeyResultTab extends PureComponent {

  updateKeyResult = values => {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }

  render() {
    const dummyLabel = <Label className='zero-width'>&nbsp;</Label>; // Label 付きタブと高さを合わせるためのダミー Label
    const comments = this.props.keyResult.get('comments');
    return (
      <Tab panes={[
        {
          menuItem: <Menu.Item key='keyResult'>Key Result{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane>
            <KeyResultPane {...this.props} updateKeyResult={this.updateKeyResult} />
          </Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='links'>紐付き{dummyLabel}</Menu.Item>,
          render: () => <Tab.Pane>
            <LinkPane okr={this.props.keyResult}
                      candidates={this.props.objectiveCandidates}
                      isObjective={false}
                      isObjectiveOwner={this.props.isObjectiveOwner}
                      isFetchedCandidates={this.props.isFetchedObjectiveCandidates}
                      updateOkr={this.updateKeyResult}
            />
          </Tab.Pane>
        },
        {
          menuItem: <Menu.Item key='comments'>コメント<Label>{comments ? comments.size : 0}</Label></Menu.Item>,
          render: () => <Tab.Pane loading={!comments}>
            <CommentPane {...this.props} updateKeyResult={this.updateKeyResult} />
          </Tab.Pane>
        },
      ]} />
    );
  }
}

KeyResultTab.propTypes = {
  // container
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  objectiveCandidates: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedObjectiveCandidates: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default KeyResultTab;
