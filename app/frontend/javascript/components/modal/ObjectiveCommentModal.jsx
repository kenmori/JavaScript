import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Modal, Header, Form } from 'semantic-ui-react'
import StretchCommentPane from '../okrmodal/StretchCommentPane'

class ObjectiveCommentModal extends PureComponent {
  constructor() {
    super()
    this.state = {
      text: '',
    }
  }

  componentDidMount() {
    const { objective } = this.props
    const keyResults = objective.get('keyResults')
    this.setState({ keyResultId: keyResults.first().get('id') })
  }

  addComment = () => {
    const { text, commentLabel } = this.state
    if (!text) return

    this.props.updateObjective({
      comment: {
        data: text,
        behavior: 'add',
        objective_comment_label: { id: commentLabel }
      }
    })
    this.setState({ text: '' })
    this.props.setDirty(false)
  }

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () =>
        this.props.updateObjective({
          comment: { data: id, behavior: 'remove' }
        })
    })
  }

  editComment = (id, text, label) => {
    if (!text) return

    this.props.updateObjective({
      comment: {
        data: {
          id,
          text,
          objective_comment_label: { id: label }
        },
        behavior: 'edit'
      }
    })
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value })
  }

  render() {
    const { objective, comments, commentLabel, isOpen, closeModal } = this.props
    const { text, keyResultId } = this.state
    const name = objective.get('name')

    return (
      <Modal
        closeIcon
        size="small"
        className="comment-modal"
        open={isOpen}
        onClose={closeModal}
      >
        <Modal.Content scrolling>
          <Header as="h4">{name}</Header>
          <StretchCommentPane
            comments={comments}
            onDelete={this.removeComment}
            onUpdate={this.editComment}
          />
          <Form className="comment-modal__form">
            <Form.Group className="comment-modal__form__group">
              <Form.Field className="comment-modal__form__group__field">
                <Form.TextArea
                  autoHeight
                  rows={2}
                  value={text}
                  placeholder={
                    '進捗状況や、次のアクションなどをメモしてください。\n(Markdown を記述できます)'
                  }
                  onChange={this.handleTextChange}
                />
              </Form.Field>
            </Form.Group>
            <Form.Group className="comment-modal__form__group">
              <Form.Field>
                <Form.Button
                  content="投稿する"
                  className="right floated comment-modal__form__group__button"
                  onClick={this.addComment}
                />
              </Form.Field>
            </Form.Group>
          </Form>
        </Modal.Content>
      </Modal>
    )
  }
}

ObjectiveCommentModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  objective: ImmutablePropTypes.map.isRequired,
  commentLabel: ImmutablePropTypes.map.isRequired,
  objectiveCommentLabels: ImmutablePropTypes.list.isRequired,
  updateObjective: PropTypes.func.isRequired
}

export default ObjectiveCommentModal
