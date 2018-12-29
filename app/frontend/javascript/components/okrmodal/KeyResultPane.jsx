import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Form, Label } from 'semantic-ui-react'
import DatePicker from '../form/DatePicker'
import AutoInput from '../form/AutoInput'
import NumberInput from '../form/NumberInput'
import StatusRadio from '../util/StatusRadio'
import PopupLabel from '../util/PopupLabel'
import moment from 'moment'
import CommentLabelDropdown from './CommentLabelDropdown'
import StretchCommentPane from './StretchCommentPane'
import OkrDescription from '../form/OkrDescription'

class KeyResultPane extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      progressRate: props.keyResult.get('progressRate'),
      isTargetValueVisible:
        typeof props.keyResult.get('targetValue') === 'number'
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.keyResult.get('id') !== nextProps.keyResult.get('id')) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate'),
        isTargetValueVisible:
          typeof nextProps.keyResult.get('targetValue') === 'number'
      })
    } else if (
      this.props.keyResult.get('progressRate') !==
      nextProps.keyResult.get('progressRate')
    ) {
      this.setState({
        progressRate: nextProps.keyResult.get('progressRate')
      })
    }
  }

  handleTargetValueCommit = targetValue =>
    this.props.updateKeyResult({ targetValue })

  handleActualValueCommit = actualValue =>
    this.props.updateKeyResult({ actualValue })

  handleValueUnitCommit = valueUnit => this.props.updateKeyResult({ valueUnit })

  handleTargetValueVisibleClick = () =>
    this.setState({ isTargetValueVisible: true })

  handleProgressRateChange = progressRate => this.setState({ progressRate })

  handleProgressRateCommit = progressRate =>
    this.props.updateKeyResult({ progressRate: progressRate || null })

  handleSubProgressRateClick = () =>
    this.props.updateKeyResult({ progressRate: null })

  handleExpiredDateChange = expiredDate =>
    this.props.updateKeyResult({
      expiredDate: expiredDate.format('YYYY-MM-DD')
    })

  handleStatusChange = status => this.props.updateKeyResult({ status })

  handleResultCommit = result => this.props.updateKeyResult({ result })

  handleDescriptionCommit = description => this.props.updateKeyResult({ description })

  subProgressRateHtml(keyResult) {
    const progressRate = keyResult.get('progressRate')
    const subProgressRate = keyResult.get('subProgressRate')
    return (
      typeof subProgressRate === 'number' &&
      progressRate !== subProgressRate && (
        <div className="flex-field__item">
          <PopupLabel
            icon="unlinkify"
            text={`下位 OKR の進捗は ${subProgressRate}% です`}
            tips="クリックすると下位 OKR の進捗が設定されます"
            onClick={this.handleSubProgressRateClick}
          />
        </div>
      )
    )
  }

  handleTextChange = (e, { value }) => {
    this.setState({ text: value })
    this.props.setDirty(!!value)
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

  removeComment = id => {
    this.props.confirm({
      content: 'コメントを削除しますか？',
      onConfirm: () =>
        this.props.updateKeyResult({
          comment: { data: id, behavior: 'remove' }
        })
    })
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

  handleDropdownChange = (e, { value }) => {
    this.setState({ commentLabel: value })
  }

  render() {
    const keyResult = this.props.keyResult
    const keyResultCommentLabels = this.props.keyResultCommentLabels
    const { text } = this.state
    const comments = keyResult.get('comments')
    const descText = keyResult.get('description')
    const [targetValue, actualValue] = [
      keyResult.get('targetValue'),
      keyResult.get('actualValue')
    ]

    return (
      <Form>
        {this.state.isTargetValueVisible ? (
          <Form.Group>
            <Form.Field className="flex-field">
              <label>目標値</label>
              <div className="flex-field__item">
                <AutoInput
                  value={typeof targetValue === 'number' ? targetValue : ''}
                  placeholder="数値"
                  onCommit={this.handleTargetValueCommit}
                />
                <AutoInput
                  value={keyResult.get('valueUnit') || ''}
                  placeholder="単位"
                  onCommit={this.handleValueUnitCommit}
                />
              </div>
            </Form.Field>

            <Form.Field className="flex-field">
              <label>実績値</label>
              <div className="flex-field__item">
                <AutoInput
                  value={typeof actualValue === 'number' ? actualValue : ''}
                  placeholder="数値"
                  onCommit={this.handleActualValueCommit}
                />
              </div>
              <div className="flex-field__item">
                {keyResult.get('valueUnit') || ''}
              </div>
              {keyResult.get('achievementRate') >= 100 && (
                <div className="flex-field__item">
                  <Label
                    pointing="left"
                    content={`達成率は ${keyResult.get(
                      'achievementRate'
                    )}% です！`}
                  />
                </div>
              )}
            </Form.Field>
          </Form.Group>
        ) : (
          <Form.Button
            content="目標値を設定する"
            onClick={this.handleTargetValueVisibleClick}
            size="small"
            floated="right"
          />
        )}

        <Form.Field className="flex-field progress-rate-field">
          <label>進捗</label>
          <div className="flex-field__item">
            <NumberInput
              label="%"
              value={this.state.progressRate}
              onChange={this.handleProgressRateChange}
              onCommit={this.handleProgressRateCommit}
            />
          </div>
          <div className="flex-field__item slider">
            <NumberInput
              type="range"
              value={this.state.progressRate}
              onChange={this.handleProgressRateChange}
              onMouseUp={this.handleProgressRateCommit}
            />
          </div>
          {this.subProgressRateHtml(keyResult)}
        </Form.Field>

        <Form.Field className="flex-field input-date-picker">
          <label>期限</label>
          <div className="flex-field__item">
            <DatePicker
              dateFormat="YYYY/M/D"
              locale="ja"
              selected={moment(keyResult.get('expiredDate'))}
              onChange={this.handleExpiredDateChange}
            />
          </div>
        </Form.Field>

        <Form.Field className="flex-field">
          <label>見通し</label>
          <div className="flex-field__item">
            <StatusRadio
              status={keyResult.get('status')}
              onChange={this.handleStatusChange}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <label>説明</label>
          <OkrDescription
            key={keyResult.get('id')}
            text={descText}
            onCommit={this.handleDescriptionCommit}
            isObjective={false}
          />
        </Form.Field>

        <Form.Field className="flex-field">
          <label>結果</label>
          <div className="flex-field__item">
            <AutoInput
              value={keyResult.get('result') || ''}
              placeholder="Key Result の最終的な進捗を補足する結果を入力してください"
              onCommit={this.handleResultCommit}
            />
          </div>
        </Form.Field>

        <Form.Field>
          <label>コメント ({comments ? comments.size : 0})</label>
          <div className="comment-pane">
            {comments ? (
              <StretchCommentPane
                comments={comments}
                commentLabels={keyResultCommentLabels}
                onDelete={this.removeComment}
                onUpdate={this.editComment}
              />
            ) : null}
            <Form.TextArea
              autoHeight
              rows={2}
              value={text}
              onChange={this.handleTextChange}
              placeholder={
                '進捗状況や、次のアクションなどをメモしてください。\n(Markdown を記述できます)'
              }
            />
            <div className="comment-pane__block">
              <Form.Group className="group">
                <CommentLabelDropdown
                  commentLabels={keyResultCommentLabels}
                  onChange={this.handleDropdownChange}
                />
                <Form.Button content="投稿する" onClick={this.addComment} />
              </Form.Group>
            </div>
          </div>
        </Form.Field>
      </Form>
    )
  }
}

KeyResultPane.propTypes = {
  // container
  isKeyResultOwner: PropTypes.bool.isRequired,
  // component
  keyResult: ImmutablePropTypes.map.isRequired,
  users: ImmutablePropTypes.list.isRequired,
  loginUserId: PropTypes.number.isRequired,
  isObjectiveOwner: PropTypes.bool.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  removeKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  setDirty: PropTypes.func.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired
}

export default KeyResultPane
