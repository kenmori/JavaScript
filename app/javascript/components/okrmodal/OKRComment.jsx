import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Form, Icon, Button, TextArea, Divider, Comment } from 'semantic-ui-react';
import AutoTextArea from '../form/AutoTextArea';
import moment from 'moment';
import avatar_image from '../../images/avatar.png';

class OKRComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: props.item.get('text'),
      editing: false,
    }
  }

  commentText() {
    const user = this.props.item.get('user')
    const avatarUrl = user ? user.get('avatarUrl') : null

    return (
      <Comment.Group>
        <Comment>
          <Comment.Avatar src={avatarUrl || avatar_image} className='avatar__inner'/>
          <Comment.Content>
            <Comment.Author as='span'>{this.props.item.get('fullName')}</Comment.Author>
            <Comment.Metadata>
              <div>{moment(this.props.item.get('updatedAt')).format('YYYY/M/D H:mm')}</div>
            </Comment.Metadata>
            <Comment.Text>{this.props.item.get('text')}</Comment.Text>
            <Comment.Actions>
              <a onClick={() => this.setState({editing: true})}>編集</a>
              <a onClick={() => this.props.onDelete(this.props.item.get('id'))}>削除</a>
            </Comment.Actions>
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
                      onCommit={value => this.setState({text: value})}
                      readOnly={!item.get('editable')}/>
        <div className="comments__item-meta">
          <Button content="キャンセル" onClick={() => this.setState({editing: false})} floated='right' />
          <Button content="更新する" onClick={() => {
            this.props.onUpdate(item.get('id'), this.state.text)
            this.setState({editing: false})
          }} as="div" floated='right' />
        </div>
      </div>
    );
  }

  render() {
    const editing = this.state.editing;
    return editing ? this.commentTextArea() : this.commentText()
  }
}

OKRComment.propTypes = {
  item: PropTypes.object.isRequired,
  editing: PropTypes.bool,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

OKRComment.defaultProps = {
  editing: false,
}


export default OKRComment
