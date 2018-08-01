import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Select, Form } from 'semantic-ui-react'

class OkrSpanSelect extends PureComponent {

  static OKR_SPAN_OPTIONS = [
    { key: 1, value: 1, text: '1ヶ月間' },
    { key: 3, value: 3, text: '3ヶ月間' },
    { key: 6, value: 6, text: '半年間' },
    { key: 12, value: 12, text: '1年間' }
  ]

  handleChange = (e, { value }) => {
    if (this.props.value !== value) {
      this.props.onChange(value)
    }
  }

  render() {
    const { value, inForm } = this.props
    return inForm ? (
      <Form.Select
        inline
        label="OKR 周期"
        options={OkrSpanSelect.OKR_SPAN_OPTIONS}
        value={value}
        onChange={this.handleChange}
      />
    ) : (
      <Select
        options={OkrSpanSelect.OKR_SPAN_OPTIONS}
        value={value}
        onChange={this.handleChange}
        selectOnNavigation={false}
      />
    )
  }
}

OkrSpanSelect.propTypes = {
  // container
  // component
  value: PropTypes.number,
  inForm: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}

OkrSpanSelect.defaultProps = {
  inForm: false,
}

export default OkrSpanSelect
