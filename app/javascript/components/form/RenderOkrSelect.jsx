import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Select, Label } from 'semantic-ui-react'
import { okrOptions } from "../../utils/okr"

class RenderOkrSelect extends PureComponent {

  handleChange = onChange => (e, { value }) => onChange(value)

  handleClose = onBlur => e => onBlur(e)

  render() {
    const {
      input: { value, onChange, onBlur },
      okrs,
      withNone,
      disabled,
      loading,
      meta: { touched, error }
    } = this.props
    return (
      <div className="form-item">
        <div className={`okr-select ${disabled ? 'disabled' : ''}`}>
          <Select
            search
            fluid
            options={okrOptions(okrs, withNone)}
            value={value}
            disabled={disabled}
            loading={loading}
            error={touched && !!error}
            onChange={this.handleChange(onChange)}
            onClose={this.handleClose(onBlur)}
            selectOnNavigation={false}
            noResultsMessage='結果が見つかりません'
          />
        </div>
        {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </div>

    )
  }
}

RenderOkrSelect.propTypes = {
  // container
  // component
  okrs: ImmutablePropTypes.list.isRequired,
  withNone: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
}

RenderOkrSelect.defaultProps = {
  withNone: false,
  disabled: false,
  loading: false,
}

export default RenderOkrSelect
