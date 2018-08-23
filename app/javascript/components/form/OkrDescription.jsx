import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'semantic-ui-react'
import AutoTextArea from './AutoTextArea'
import Markdown from '../util/Markdown'

class OkrDescription extends PureComponent {

  constructor() {
    super()
    this.state = { isEditing: false }
  }

  handleEditClick = () => this.setState({ isEditing: true })

  handleTextCommit = text => {
    const { text: textBefore, onCommit } = this.props
    if (textBefore !== text) {
      onCommit(text)
    }
    this.setState({ isEditing: false })
  }

  renderTextOnly() {
    const { text } = this.props
    return (
      <div className="okr-description-text-only">
        <div className="okr-description-text-only__text"><Markdown text={text} /></div>
        <div className="okr-description-text-only__button">
          <Button content="編集する" onClick={this.handleEditClick} size="small" />
        </div>
      </div>
    )
  }

  renderTextArea() {
    const { text, isObjective } = this.props
    const okr = isObjective ? 'Objective' : 'Key Result'
    return (
      <div className="okr-description-text-area">
        <AutoTextArea
          value={text}
          placeholder={`${okr} についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。\n(Markdown を記述できます)`}
          onCommit={this.handleTextCommit}
          verbose={true}
        />
      </div>
    )
  }

  render() {
    const { text } = this.props
    const { isEditing } = this.state
    return (!text || isEditing) ? this.renderTextArea() : this.renderTextOnly()
  }
}

OkrDescription.propTypes = {
  // container
  // component
  text: PropTypes.string.isRequired,
  isObjective: PropTypes.bool,
  onCommit: PropTypes.func.isRequired,
}

OkrDescription.defaultProps = {
  isObjective: true,
}

export default OkrDescription
