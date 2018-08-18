import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Button, TextArea, Divider, Comment } from 'semantic-ui-react';
import AutoTextArea from '../form/AutoTextArea';
import moment from 'moment';
import avatar_image from '../../images/avatar.png';
import Markdown from '../util/Markdown';
import UserName from '../util/UserName'

class OkrComment extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.get('text'),
      editing: false,
    }
  }

  handleEditClick = () => this.setState({ editing: true })

  handleDeleteClick = () => this.props.onDelete(this.props.item.get('id'))

  handleTextCommit = text => this.setState({ text })

  handleCancelClick = () => this.setState({ editing: false })

  handleUpdateClick = () => {
    this.props.onUpdate(this.props.item.get('id'), this.state.text)
    this.setState({ editing: false })
  }

  commentText() {
    const user = this.props.item.get('user')
    const avatarUrl = user ? user.get('avatarUrl') : null
    const isDisabled = user.get('disabled')
    return (
      <Comment.Group className='okr-comment'>
        <Comment>
          <Comment.Avatar src={avatarUrl || avatar_image} className={isDisabled ? 'disabled' : ''} />
          <Comment.Content>
            <Comment.Author><UserName user={user} /></Comment.Author>
            <Comment.Metadata>
              <div>{moment(this.props.item.get('updatedAt')).format('YYYY/M/D H:mm')} {this.props.item.get('isEdited') ? '(編集済)' : null}</div>
            </Comment.Metadata>
            <Comment.Text>
              <Markdown text={this.props.item.get('text')}></Markdown>
            </Comment.Text>
            {this.props.item.get('editable') ?
              (
                <Comment.Actions>
                  <a onClick={this.handleEditClick}>編集</a>
                  <a onClick={this.handleDeleteClick}>削除</a>
                </Comment.Actions>
              ) : null}
          </Comment.Content>
        </Comment>
      </Comment.Group>
    )
  }

  commentTextArea() {
    const {item} = this.props
    return (
      <div className="comments__item">
        <AutoTextArea value={item.get('text')}
                      onCommit={this.handleTextCommit}
                      readOnly={!item.get('editable')}/>
        <div className="comments__item-meta">
          <Button content="キャンセル" onClick={this.handleCancelClick} floated='right' />
          <Button content="更新する" onClick={this.handleUpdateClick} as="div" floated='right' />
        </div>
      </div>
    );
  }

  render() {
    const editing = this.state.editing;
    return editing ? this.commentTextArea() : this.commentText()
  }
}

OkrComment.propTypes = {
  item: PropTypes.object.isRequired,
  editing: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

OkrComment.defaultProps = {
  editing: false,
}


export default OkrComment
