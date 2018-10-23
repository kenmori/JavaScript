import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form } from 'semantic-ui-react'
import OkrComment from './OkrComment'
import KeyResultCommentLabelDropdown from './KeyResultCommentLabelDropdown'

class CommentPane extends PureComponent {
  constructor() {
    super()
    this.state = {
      text: '',
      commentLabel: ''
    }
  }

  addComment = () => {
    const { text, commentLabel } = this.state
    if (!text) return

    this.props.updateKeyResult({
      comment: {
        data: text,
        behavior: 'add',
        key_result_comment_label: { id: commentLabel }
      }
    })
    this.setState({ text: '' })
    this.props.setDirty(false)
  }

  editComment = (id, text, label) => {
    if (!text) return

    this.props.updateKeyResult({
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

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () =>
        this.props.updateKeyResult({
          comment: { data: id, behavior: 'remove' }
        })
    })
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value })
    this.props.setDirty(!!value)
  }

  handleDropdownChange = (e, { value }) => {
    this.setState({ commentLabel: value })
  }

  render() {
    const { keyResult, keyResultCommentLabels } = this.props
    const { text } = this.state
    const comments = keyResult.get('comments')

    return (
      <div className="comment-pane">
        <Form>
          <Form.TextArea
            autoHeight
            rows={3}
            value={text}
            onChange={this.handleTextChange}
            placeholder={
              '進捗状況や、次のアクションなどをメモしてください。\n(Markdown を記述できます)'
            }
          />
          <div className="comment-pane__block">
            <Form.Group className="group">
              <KeyResultCommentLabelDropdown
                commentLabels={keyResultCommentLabels}
                onChange={this.handleDropdownChange}
              />
              <Form.Button content="投稿する" onClick={this.addComment} />
            </Form.Group>
          </div>
        </Form>
        {comments &&
          comments.map(comment => (
            <OkrComment
              key={comment.get('id')}
              comment={comment}
              commentLabels={keyResultCommentLabels}
              onDelete={this.removeComment}
              onUpdate={this.editComment}
            />
          ))}
      </div>
    )
  }
}

CommentPane.propTypes = {
  // container
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired
}

export default CommentPane
