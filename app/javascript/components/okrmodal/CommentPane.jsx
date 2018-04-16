import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Button, TextArea, Divider } from 'semantic-ui-react';
import AutoTextArea from '../form/AutoTextArea';
import moment from 'moment';

class CommentPane extends Component {

  updateKeyResult(values) {
    this.props.updateKeyResult({ id: this.props.keyResult.get('id'), ...values });
  }

  commentList(comments) {
    const commentTags = comments.map((item) => {
      return (
        <div className="comments" key={item.get('id')}>
          <div className="comments__item">
            <AutoTextArea value={item.get('text')}
                          onCommit={value => this.editComment(item.get('id'), value)}
                          readOnly={!item.get('editable')}
            />
            <div className="comments__item-meta">
              <div className="comments__item-updated">{moment(item.get('updatedAt')).format('YYYY/M/D H:mm')}</div>
              <div className="comments__item-name">{item.get('fullName')}</div>
              {item.get('editable') && <Icon link name="trash" className="comments__item-icon" onClick={() => {this.removeComment(item.get('id'))}} />}
            </div>
          </div>
        </div>
      )
    });
    return <div>{commentTags}</div>;
  }

  addComment() {
    const value = findDOMNode(this.refs.commentArea).value;
    if (!value) {
      return;
    }
    this.updateKeyResult({
      comment: {data: value, behavior: 'add'}
    });
    findDOMNode(this.refs.commentArea).value = '';
  }

  editComment(id, text) {
    if (!text) {
      return;
    }
    this.updateKeyResult({
      comment: {data: {id, text}, behavior: 'edit'}
    });
  }

  removeComment(id) {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () => {
        this.updateKeyResult({
          comment: { data: id, behavior: 'remove' }
        });
      },
    })
  }

  render() {
    const keyResult = this.props.keyResult;
    return (
      <Form>
        <Form.Field className="wide-field">
          <div className="comments__text-box">
            <TextArea autoHeight rows={3} ref='commentArea'
                      placeholder='進捗状況や、次のアクションなどをメモしてください'
            />
          </div>
          <div>
            <Button content="投稿する" onClick={() => this.addComment()} as="div" floated='right' />
          </div>
          <Divider hidden clearing />
          {this.commentList(keyResult.get('comments'))}
        </Form.Field>
      </Form>
    );
  }
}

CommentPane.propTypes = {
  keyResult: PropTypes.object.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default CommentPane;
