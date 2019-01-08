import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { reduxForm } from "redux-form";
import { List } from "immutable";
import { Button, Modal } from "semantic-ui-react";
import KeyResultSidebar from "./KeyResultSidebar";
import KeyResultForm from "./KeyResultForm";

class KeyResultModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      members: List(),
      ownerId: null,
      description: "",
      isRequiredTargetValue: false,
    };
  }

  save(validData) {
    const keyResult = {
      name: validData.name,
      description: this.state.description,
      objectiveId: this.props.objective.get("id"),
      ownerId: this.state.ownerId,
      targetValue: validData.targetValue,
      valueUnit: validData.valueUnit,
      expiredDate: validData.expiredDate,
      members: this.state.members.toArray(),
    };
    this.props.addKeyResult(keyResult);
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isOpen && nextProps.isOpen) {
      this.setState({
        members: List(),
        ownerId: nextProps.objective.getIn(["owner", "id"]),
        description: "",
        isRequiredTargetValue: false,
      });
      this.props.initialize({
        name: "",
        targetValue: "",
        valueUnit: "",
        expiredDate: nextProps.initialExpiredDate,
      });
    }
  }

  isEditing() {
    return (
      this.props.dirty ||
      this.state.description !== "" ||
      this.state.ownerId !== this.props.objective.getIn(["owner", "id"]) ||
      this.state.members.size
    );
  }

  handleClose = () => {
    if (this.isEditing()) {
      this.props.confirm({
        content: "編集中の内容を破棄します。よろしいですか？",
        onConfirm: () => this.closeModal(),
      });
    } else {
      this.closeModal();
    }
  };

  closeModal() {
    // FIXME: キャンセルボタンで背面の OKR 編集モーダルごと閉じてしまう現象を setTimeout で回避する
    // 背面の OKR 編集モーダルのモーダル外クリックが発生している (おそらく Semantic-UI のバグ)
    setTimeout(() => this.props.closeModal(), 0);
  }

  handleFormChange = values => this.setState({ ...values });

  render() {
    const { objective, handleSubmit } = this.props;
    return (
      <Modal
        closeIcon
        open={this.props.isOpen}
        size="large"
        className="keyresult-modal"
        onClose={this.handleClose}>
        <Modal.Header>KeyResult を追加する</Modal.Header>
        <Modal.Content>
          <div className="keyresult-modal__body">
            <KeyResultSidebar objective={objective} />
            <div className="keyresult-modal__main">
              <KeyResultForm
                users={this.props.users}
                ownerId={this.state.ownerId}
                members={this.state.members}
                isRequiredTargetValue={this.state.isRequiredTargetValue}
                onChange={this.handleFormChange}
              />
            </div>
          </div>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={this.handleClose}>キャンセル</Button>
          <Button positive onClick={handleSubmit(data => this.save(data))}>
            保存
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

KeyResultModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  objective: ImmutablePropTypes.map,
  users: ImmutablePropTypes.list.isRequired,
  initialExpiredDate: PropTypes.string,
  addKeyResult: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  // component
  // Redux Form
  dirty: PropTypes.bool.isRequired,
  initialize: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: "keyResultModal",
})(KeyResultModal);
