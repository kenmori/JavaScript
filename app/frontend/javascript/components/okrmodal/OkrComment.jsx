import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Comment, Label } from 'semantic-ui-react'
import AutoTextArea from '../form/AutoTextArea'
import moment from 'moment'
import avatar_image from '../../images/avatar.png'
import Markdown from '../util/Markdown'
import UserName from '../util/UserName'
import KeyResultCommentLabelDropdown from './KeyResultCommentLabelDropdown'

class OkrComment extends PureComponent {

  constructor(props) {
    super(props)
    const comment = props.comment
    const label = comment.get('label')

    this.state = {
      text: comment.get('text'),
      commentLabel: label != null ? label.get('id') : '',
      isEditing: false,
    }
  }

  handleEditClick = () => this.setState({ isEditing: true })

  handleDeleteClick = () => this.props.onDelete(this.props.comment.get('id'))

  handleTextCommit = text => this.setState({ text })

  handleCancelClick = () => this.setEditingFalse()

  handleUpdateClick = () => {
    const { comment, onUpdate } = this.props
    const { text, commentLabel } = this.state
    const label = comment.get('label')
    const labelId = label != null ? label.get('id') : ''
    if (comment.get('text') !== text || labelId !== commentLabel) {
      onUpdate(comment.get('id'), text, commentLabel)
    }
    this.setEditingFalse()
  }

  handleDropdownChange = (e, { value }) => {
    this.setState({ commentLabel: value })
  }

  setEditingFalse = () => {
    // setTimeout: workaround for "Form submission canceled because the form is not connected"
    setTimeout(() => this.setState({ isEditing: false }), 0)
  }

  renderTextOnly() {
    const { comment } = this.props
    const user = comment.get('user')
    const avatarUrl = user ? user.get('avatarUrl') : null
    const isDisabled = user.get('disabled')
    const label = comment.get('label')
    return (
      <Comment.Group className="okr-comment-text-only">
        <Comment>
          <Comment.Avatar src={avatarUrl || avatar_image} className={isDisabled ? 'disabled' : ''} />
          <Comment.Content>
            {label && (
              <Label color={label.get('color')} className={'label'}>
                {label.get('name')}
              </Label>
            )}
            <Comment.Author><UserName user={user} /></Comment.Author>
            <Comment.Metadata>
              {moment(comment.get('updatedAt')).format('YYYY/M/D H:mm')} {comment.get('isEdited') ? '(編集済)' : null}
            </Comment.Metadata>
            <Comment.Text>
              <Markdown text={comment.get('text')} />
            </Comment.Text>
            {comment.get('editable') && (
              <Comment.Actions>
                <Comment.Action onClick={this.handleEditClick}>編集</Comment.Action>
                <Comment.Action onClick={this.handleDeleteClick}>削除</Comment.Action>
              </Comment.Actions>
            )}
          </Comment.Content>
        </Comment>
      </Comment.Group>
    )
  }

  renderTextArea() {
    const { comment, commentLables } = this.props
    const label = comment.get('label')

    return (
      <Form className="okr-comment-text-area">
        <AutoTextArea
          value={comment.get('text')}
          placeholder={'進捗状況や、次のアクションなどをメモしてください。\n(Markdown を記述できます)'}
          onCommit={this.handleTextCommit}
          readOnly={!comment.get('editable')}
        />
        <Form.Group className="okr-comment-text-area__buttons">
          <KeyResultCommentLabelDropdown
            commentLables={commentLables}
            defaultValue={label ? label.get('id') : null}
            onChange={this.handleDropdownChange} />
          <Form.Button content="キャンセル" onClick={this.handleCancelClick} size="small" />
          <Form.Button content="更新する" onClick={this.handleUpdateClick} size="small" />
        </Form.Group>
      </Form>
    )
  }

  render() {
    const { isEditing } = this.state
    return isEditing ? this.renderTextArea() : this.renderTextOnly()
  }
}

OkrComment.propTypes = {
  comment: ImmutablePropTypes.map.isRequired,
  commentLables: ImmutablePropTypes.list.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default OkrComment
