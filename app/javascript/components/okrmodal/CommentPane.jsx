import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form } from 'semantic-ui-react';
import OkrComment from './OkrComment';

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
    });
    this.setState({ text: '' })
  }

  editComment = (id, text) => {
    if (!text) return

    this.props.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    });
  }

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () => this.props.updateKeyResult({
        comment: { data: id, behavior: 'remove' }
      }),
    })
  }

  handleTextChange = (e, { value }) => this.setState({ text: value })

  render() {
    const { keyResult } = this.props
    const { text } = this.state
    const comments = keyResult.get('comments')
    return (
      <Form className="comment-pane">
        <Form.TextArea
          autoHeight
          rows={3}
          value={text}
          onChange={this.handleTextChange}
          placeholder="進捗状況や、次のアクションなどをメモしてください"
        />

        <div className="comment-pane__button">
          <Form.Button content="投稿する" onClick={this.addComment} />
        </div>

        {comments && comments.map(comment => (
          <OkrComment
            key={comment.get('id')}
            comment={comment}
            onDelete={this.removeComment}
            onUpdate={this.editComment}
          />
        ))}
      </Form>
    );
  }
}

CommentPane.propTypes = {
  // container
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default CommentPane;
