import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Tab, Menu, Label } from "semantic-ui-react";
import ObjectivePane from "../../containers/ObjectivePane";
import ObjectiveInfoPane from "../../containers/ObjectiveInfoPane";

class ObjectiveTab extends PureComponent {
  updateObjective = values => {
    this.props.updateObjective({
      id: this.props.objective.get("id"),
      ...values,
    });
  };

  render() {
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
                  {...this.props}
                  updateObjective={this.updateObjective}
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
                  okr={this.props.objective}
                  objective={this.props.objective}
                  candidates={this.props.parentKeyResultCandidates}
                  isObjectiveOwner={this.props.isObjectiveOwner}
                  isFetchedCandidates={this.props.isFetchedKeyResultCandidates}
                  updateOkr={this.updateObjective}
                  confirm={this.props.confirm}
                  users={this.props.users}
                  removeObjective={this.props.removeObjective}
                />
              </Tab.Pane>
            ),
          },
        ]}
      />
    );
  }
}

ObjectiveTab.propTypes = {
  // container
  // component
  objective: ImmutablePropTypes.map.isRequired,
  parentKeyResultCandidates: ImmutablePropTypes.list.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  isFetchedKeyResultCandidates: PropTypes.bool.isRequired,
  updateObjective: PropTypes.func.isRequired,
  removeObjective: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default ObjectiveTab;
