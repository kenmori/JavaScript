import React from "react";
import { Tab, Menu, Label } from "semantic-ui-react";
import ObjectivePane from "./ObjectivePane";
import ObjectiveInfoPane from "./ObjectiveInfoPane";
import ObjectiveHistoryPane from "./ObjectiveHistoryPane";

const ObjectiveTab = React.memo(
  ({
    objective,
    users,
    parentKeyResultCandidates,
    loginUserId,
    isAdmin,
    isObjectiveOwner,
    isFetchedKeyResultCandidates,
    updateObjective,
    disableObjective,
    removeObjective,
    fetchObjectiveHistory,
    openOKRModal,
    confirm,
    setDirty,
  }) => {
    const updateObjectiveWithValues = values => {
      updateObjective({
        id: objective.get("id"),
        ...values,
      });
    };
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
                <ObjectivePane
                  isAdmin={isAdmin}
                  objective={objective}
                  disableObjective={disableObjective}
                  updateObjective={updateObjectiveWithValues}
                  setDirty={setDirty}
                  confirm={confirm}
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
                <ObjectiveInfoPane
                  objective={objective}
                  users={users}
                  candidates={parentKeyResultCandidates}
                  loginUserId={loginUserId}
                  isAdmin={isAdmin}
                  isObjectiveOwner={isObjectiveOwner}
                  isFetchedCandidates={isFetchedKeyResultCandidates}
                  disableObjective={disableObjective}
                  removeObjective={removeObjective}
                  updateObjective={updateObjectiveWithValues}
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
                <ObjectiveHistoryPane
                  objective={objective}
                  fetchObjectiveHistory={fetchObjectiveHistory}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    );
  },
);

export default ObjectiveTab;
