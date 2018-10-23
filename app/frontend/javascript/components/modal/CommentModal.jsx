import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Modal, Header, Form } from 'semantic-ui-react'
import StretchCommentPane from '../okrmodal/StretchCommentPane'

class CommentModal extends PureComponent {
  constructor() {
    super()
    this.state = {
      text: '',
      keyResultId: null
    }
  }

  componentDidMount() {
    const { objective } = this.props
    const keyResults = objective.get('keyResults')
    this.setState({ keyResultId: keyResults.first().get('id') })
  }

  addComment = () => {
    const { commentLabel } = this.props
    const { text } = this.state
    if (!text) return

    this.props.updateKeyResult({
      id: this.state.keyResultId,
      comment: {
        data: text,
        behavior: 'add',
        key_result_comment_label: {
          id: commentLabel.get('id')
        }
      }
    })
    this.setState({ text: '' })
  }

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () =>
        this.props.updateKeyResult({
          id: this.state.keyResultId,
          comment: { data: id, behavior: 'remove' }
        })
    })
  }

  editComment = (id, text, label) => {
    if (!text) return
    this.props.updateKeyResult({
      id: this.state.keyResultId,
      comment: {
        data: {
          id,
          text,
          key_result_comment_label: { id: label }
        },
        behavior: 'edit'
      }
    })
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value })
  }

  handleDropdownChange = (e, { value }) => {
    this.setState({ keyResultId: value })
  }

  selectLabelCommnets = (comments, label) => {
    return comments.filter(v => v.get('label').get('name') === label)
  }

  render() {
    const { objective, comments, commentLabel, isOpen, closeModal } = this.props
    const { text, keyResultId } = this.state
    const keyResults = objective.get('keyResults')
    const keyResultsList = []
    keyResults.forEach(v =>
      keyResultsList.push({ text: v.get('name'), value: v.get('id') })
    )

    return (
      <Modal
        closeIcon
        size="small"
        className="comment-modal"
        open={isOpen}
        onClose={closeModal}
      >
        <Modal.Content scrolling>
          <Header as="h4">{`${
            commentLabel != null ? commentLabel.get('name') : ''
          }一覧`}</Header>
          <StretchCommentPane
            comments={this.selectLabelCommnets(
              comments,
              commentLabel.get('name')
            )}
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
              <Form.Field className="comment-modal__form__group__label">
                <label>Key Result</label>
              </Form.Field>
              <Form.Field>
                <Form.Dropdown
                  selection
                  labeled
                  options={keyResultsList}
                  defaultValue={keyResultId}
                  onChange={this.handleDropdownChange}
                />
              </Form.Field>
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

CommentModal.propTypes = {
  confirm: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  objective: ImmutablePropTypes.map.isRequired,
  commentLabel: ImmutablePropTypes.map.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired,
  updateKeyResult: PropTypes.func.isRequired
}

export default CommentModal
