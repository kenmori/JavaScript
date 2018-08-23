import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form } from 'semantic-ui-react'
import OkrComment from './OkrComment'

class CommentPane extends PureComponent {

  constructor() {
    super()
    this.state = { text: '' }
  }

  addComment = () => {
    const { text } = this.state
    if (!text) return

    this.props.updateKeyResult({
      comment: {data: text, behavior: 'add'}
    })
    this.setState({ text: '' })
    this.props.setDirty(false)
  }

  editComment = (id, text) => {
    if (!text) return

    this.props.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    })
  }

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () => this.props.updateKeyResult({
        comment: { data: id, behavior: 'remove' }
      }),
    })
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value })
    this.props.setDirty(!!value)
  }

  render() {
    const { keyResult } = this.props
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
            placeholder={`進捗状況や、次のアクションなどをメモしてください。\n(Markdown を記述できます)`}
          />

          <div className="comment-pane__button">
            <Form.Button content="投稿する" onClick={this.addComment} />
          </div>
        </Form>

        {comments && comments.map(comment => (
          <OkrComment
            key={comment.get('id')}
            comment={comment}
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
}

export default CommentPane
