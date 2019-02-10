import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Tab, Menu, Label } from "semantic-ui-react";
import { track } from "../../../../utils/mixpanel";
import KeyResultPane from "./KeyResultPane";
import KeyResultInfoPane from "./KeyResultInfoPane";
import KeyResultHistoryPane from "./KeyResultHistoryPane";

class KeyResultTab extends PureComponent {
  constructor() {
    super();
    this.state = { activeIndex: 0 };
  }

  updateKeyResult = values => {
    this.props.updateKeyResult({
      id: this.props.keyResult.get("id"),
      ...values,
    });
  };

  handleTabChange = (_, { activeIndex }) => {
    const { isDirty, confirm, setDirty } = this.props;
    const { activeIndex: currentIndex } = this.state;
    if (activeIndex !== currentIndex && isDirty) {
      confirm({
        content: "編集中の内容を破棄します。よろしいですか？",
        onConfirm: () => {
          this.setState({ activeIndex });
          setDirty(false);
        },
      });
    } else {
      this.setState({ activeIndex });
    }
    switch (activeIndex) {
      case 0:
        track.changeTabToProgressFromOKRModalKR();
        break;
      case 1:
        track.changeTabToInfoFromOKRModalKR();
        break;
      case 2:
        track.changeTabToHistoryFromOKRModalKR();
        break;
    }
  };

  render() {
    const {
      loginUserId,
      users,
      keyResult,
      keyResultCommentLabels,
      objectiveCandidates,
      isObjectiveOwner,
      isKeyResultOwner,
      isFetchedObjectiveCandidates,
      disableKeyResult,
      removeKeyResult,
      openObjectiveModal,
      fetchKeyResultHistory,
      openOKRModal,
      confirm,
      setDirty,
    } = this.props;
    const { activeIndex } = this.state;
    const dummyLabel = <Label className="zero-width">&nbsp;</Label>; // Label 付きタブと高さを合わせるためのダミー Label

    return (
      <Tab
        panes={[
          {
            menuItem: (
              <Menu.Item key="progress">
                進捗
                {dummyLabel}
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <KeyResultPane
                  keyResult={keyResult}
                  keyResultCommentLabels={keyResultCommentLabels}
                  updateKeyResult={this.updateKeyResult}
                  confirm={confirm}
                  setDirty={setDirty}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: (
              <Menu.Item key="info">
                情報
                {dummyLabel}
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <KeyResultInfoPane
                  loginUserId={loginUserId}
                  keyResult={keyResult}
                  users={users}
                  candidates={objectiveCandidates}
                  isObjectiveOwner={isObjectiveOwner}
                  isKeyResultOwner={isKeyResultOwner}
                  isFetchedCandidates={isFetchedObjectiveCandidates}
                  openObjectiveModal={openObjectiveModal}
                  updateOkr={this.updateKeyResult}
                  disableKeyResult={disableKeyResult}
                  updateKeyResult={this.updateKeyResult}
                  removeKeyResult={removeKeyResult}
                  openOKRModal={openOKRModal}
                  confirm={confirm}
                />
              </Tab.Pane>
            ),
          },
          {
            menuItem: (
              <Menu.Item key="history">
                履歴
                {dummyLabel}
              </Menu.Item>
            ),
            render: () => (
              <Tab.Pane>
                <KeyResultHistoryPane
                  keyResult={keyResult}
                  fetchKeyResultHistory={fetchKeyResultHistory}
                />
              </Tab.Pane>
            ),
          },
        ]}
        activeIndex={activeIndex}
        onTabChange={this.handleTabChange}
      />
    );
  }
}

KeyResultTab.propTypes = {
  loginUserId: PropTypes.number.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  keyResult: ImmutablePropTypes.map.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired,
  objectiveCandidates: ImmutablePropTypes.list.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isKeyResultOwner: PropTypes.bool.isRequired,
  isFetchedObjectiveCandidates: PropTypes.bool.isRequired,
  isDirty: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  disableKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  fetchKeyResultHistory: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default KeyResultTab;
