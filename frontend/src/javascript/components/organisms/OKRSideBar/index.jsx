import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Segment, Button, Header, Divider, Input } from "semantic-ui-react";
import copy from "clipboard-copy";
import Backend from "../../../utils/backend";
import OwnerAvatar from "../../util/OwnerAvatar";
import ProgressRate from "../../util/ProgressRate";
import OkrName from "../../util/OkrName";
import KeyResultItem from "./KeyResultItem";

class OKRSideBar extends PureComponent {
  constructor(props) {
    super(props);
    const { objective, keyResultOrder } = props;
    this.state = {
      keyResultOrder,
      showDisabledOkrs:
        objective.get("keyResults").size ===
          objective.get("enabledKeyResults").size || objective.get("disabled"),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.keyResultOrder.equals(this.props.keyResultOrder)) {
      this.setState({ keyResultOrder: nextProps.keyResultOrder });
    }
  }

  moveKeyResult = (fromIndex, toIndex, toUpdate = false) => {
    const { objective, updateKeyResultOrder } = this.props;
    const { keyResultOrder, showDisabledOkrs } = this.state;

    // フィルタリング状態の index を非フィルタリング状態の index に変換する
    const filteredKeyResultOrder = (showDisabledOkrs
      ? objective.get("keyResults")
      : objective.get("enabledKeyResults")
    )
      .map(keyResult => keyResult.get("id"))
      .sortBy(id => keyResultOrder.indexOf(id));
    const fromId = filteredKeyResultOrder.get(fromIndex);
    const toId = filteredKeyResultOrder.get(toIndex);
    fromIndex = keyResultOrder.indexOf(fromId);
    toIndex = keyResultOrder.indexOf(toId);

    const newKeyResultOrder = keyResultOrder
      .delete(fromIndex)
      .insert(toIndex, fromId);
    if (toUpdate) {
      updateKeyResultOrder(objective.get("id"), newKeyResultOrder);
    } else {
      this.setState({ keyResultOrder: newKeyResultOrder });
    }
  };

  updateKeyResultOrder = () => {
    if (!this.state.keyResultOrder.equals(this.props.keyResultOrder)) {
      this.props.updateKeyResultOrder(
        this.props.objective.get("id"),
        this.state.keyResultOrder,
      );
    }
  };

  handleSelectIndex = ({ index, objectiveId = null, keyResultId = null }) => {
    this.props.onChange({ index, objectiveId, keyResultId });
  };

  handleAddKeyResultClick = () =>
    this.props.openKeyResultModal(this.props.objective);

  handleShowDisabledOkrsClick = () => this.setState({ showDisabledOkrs: true });

  generateUrl = id => `${location.origin}/objectives/${id}`;

  handleCopyClick = id => {
    copy(this.generateUrl(id));
    this.props.showToast("URLをコピーしました");
  };

  handleFocus = event => event.target.select();

  render() {
    const { objective, keyResultId, canMoveKeyResult } = this.props;
    const { keyResultOrder, showDisabledOkrs } = this.state;
    const keyResults = showDisabledOkrs
      ? objective.get("keyResults")
      : objective.get("enabledKeyResults");
    const sortedKeyResults = keyResults.sortBy(keyResult =>
      keyResultOrder.indexOf(keyResult.get("id")),
    );
    let selectedIndex = sortedKeyResults.findIndex(
      e => e.get("id") === keyResultId,
    );
    selectedIndex = selectedIndex === -1 ? 0 : selectedIndex + 1;

    return (
      <div className="okr-sidebar">
        <Segment clearing className="sidebar__header">
          <Header as="h4" floated="left">
            Objective
          </Header>
          <Header as="h6" floated="right" className="sidebar__header__label">
            <Input
              action={{
                icon: "copy",
                onClick: _ => {
                  this.handleCopyClick(objective.get("id"));
                },
              }}
              defaultValue={this.generateUrl(objective.get("id"))}
              onFocus={this.handleFocus}
            />
          </Header>
        </Segment>
        <Segment
          className={`sidebar__item ${selectedIndex === 0 ? "is-current" : ""}`}
          onClick={() =>
            this.handleSelectIndex({
              index: 0,
              objectiveId: objective.get("id"),
            })
          }>
          <OwnerAvatar owner={objective.get("owner")} />
          <div className="sidebar__name">
            <OkrName okr={objective} />
          </div>
          <ProgressRate value={objective.get("progressRate")} type="label" />
        </Segment>
        <Header as="h4">Key Result 一覧</Header>
        <Segment.Group>
          {sortedKeyResults.map((keyResult, index) => (
            <KeyResultItem
              key={keyResult.get("id")}
              index={index}
              isSelected={selectedIndex === index + 1}
              keyResult={keyResult}
              onClick={() =>
                this.handleSelectIndex({
                  index: index + 1,
                  keyResultId: keyResult.get("id"),
                })
              }
              moveKeyResult={this.moveKeyResult}
              updateKeyResultOrder={this.updateKeyResultOrder}
              canMoveKeyResult={canMoveKeyResult}
            />
          ))}
        </Segment.Group>
        {!showDisabledOkrs && (
          <Button
            fluid
            content="無効な Key Result を表示する"
            onClick={this.handleShowDisabledOkrsClick}
          />
        )}
        <Divider hidden />
        <Button
          fluid
          positive
          icon="plus"
          content="Key Result を追加する"
          onClick={this.handleAddKeyResultClick}
        />
      </div>
    );
  }
}

OKRSideBar.propTypes = {
  objective: ImmutablePropTypes.map.isRequired,
  canMoveKeyResult: PropTypes.bool.isRequired,
  keyResultOrder: ImmutablePropTypes.list.isRequired,
  updateKeyResultOrder: PropTypes.func.isRequired,
  openKeyResultModal: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  showToast: PropTypes.func.isRequired,
};

export default Backend(OKRSideBar);
