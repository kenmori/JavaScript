import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import AutosizeInput from 'react-input-autosize'

class AutoInput extends PureComponent {

  constructor(props) {
    super(props)
    this.state = { value: props.value }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.value !== nextProps.value) {
      this.setState({ value: nextProps.value })
    }
  }

  handleChange = event => {
    // 動的に幅をリサイズさせるため state 経由で value プロパティを変更する 
    this.setState({ value: event.target.value })
  }

  handleCommit = event => {
    if (this.props.value !== event.target.value) {
      this.props.onCommit(event.target.value)
    }
  }

  handleKeyPress = event => {
    if (event.key === 'Enter') {
      this.handleCommit(event)
      event.preventDefault()
    }
  }

  render() {
    return (
      <AutosizeInput className="ui input auto-input"
                     value={this.state.value}
                     placeholder={this.props.placeholder}
                     readOnly={this.props.readOnly}
                     onChange={this.handleChange}
                     onBlur={this.handleCommit}
                     onKeyPress={this.handleKeyPress}
      />
    )
  }
}

AutoInput.propTypes = {
  // container
  // component
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  readOnly: PropTypes.bool,
  onCommit: PropTypes.func,
}

AutoInput.defaultProps = {
  value: '',
  placeholder: null,
  readOnly: false,
  onCommit: value => {},
}

export default AutoInput
