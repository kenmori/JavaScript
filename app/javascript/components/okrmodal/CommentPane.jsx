import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Icon, Button, TextArea, Divider } from 'semantic-ui-react';
import OkrComment from './OkrComment';

class CommentPane extends PureComponent {

  constructor() {
    super()
    this.state = { text: '' }
  }

  commentList(comments) {
    if (!comments) return null;
    const commentTags = comments.map((item) => {
      return (
        <div className="comments" key={item.get('id')}>
          <OkrComment item={item}
                      onDelete={this.removeComment}
                      onUpdate={this.editComment}/>
        </div>
      )
    });
    return <div>{commentTags}</div>;
  }

  addComment = () => {
    const value = this.state.text;
    if (!value) {
      return;
    }
    this.props.updateKeyResult({
      comment: {data: value, behavior: 'add'}
    });
    this.setState({ text: '' })
  }

  editComment = (id, text) => {
    if (!text) {
      return;
    }
    this.props.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    });
  }

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () => {
        this.props.updateKeyResult({
          comment: { data: id, behavior: 'remove' }
        });
      },
    })
  }

  handleTextChange = (e, { value }) => this.setState({ text: value })

  render() {
    const keyResult = this.props.keyResult;
    const { text } = this.state
    return (
      <Form>
        <Form.Field className="wide-field">
          <div className="comments__text-box">
            <TextArea autoHeight rows={3} value={text} onChange={this.handleTextChange}
                      placeholder='進捗状況や、次のアクションなどをメモしてください'
            />
          </div>
          <div>
            <Button content="投稿する" onClick={this.addComment} as="div" floated='right' />
          </div>
          <Divider hidden clearing />
          {this.commentList(keyResult.get('comments'))}
        </Form.Field>
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
