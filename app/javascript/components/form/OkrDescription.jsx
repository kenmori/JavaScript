import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AutoTextArea from './AutoTextArea'

class OkrDescription extends PureComponent {

  render() {
    const { text, isObjective, onCommit } = this.props
    const okr = isObjective ? 'Objective' : 'Key Result'
    return (
      <AutoTextArea
        value={text}
        placeholder={`${okr} についての説明や補足を入力してください。\n説明を入力すると、メンバーに目指すべき方向性が伝わりやすくなります。`}
        onCommit={onCommit}
      />
    )
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
