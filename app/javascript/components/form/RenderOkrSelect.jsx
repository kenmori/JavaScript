import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Label } from 'semantic-ui-react';
import { okrOptions } from "../../utils/okr";

class RenderOkrSelect extends Component {

  render() {
    const {
      input: { value, onChange, onBlur },
      okrs,
      isObjective,
      disabled,
      loading,
      meta: { touched, error }
    } = this.props;
    return (
      <div className="form-item">
        <div className={`okr-select ${disabled ? 'disabled' : ''}`}>
          <Select
            search
            fluid
            options={okrOptions(okrs, isObjective)}
            value={value || -1}
            disabled={disabled}
            loading={loading}
            error={touched && !!error}
            onChange={(e, { value }) => onChange(value)}
            onClose={e => onBlur(e)}
            selectOnNavigation={false}
            noResultsMessage='結果が見つかりません'
          />
        </div>
        {touched && error && <Label basic color='red' pointing>{error}</Label>}
      </div>

    );
  }
}

RenderOkrSelect.propTypes = {
  okrs: PropTypes.object.isRequired,
  isObjective: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
};

RenderOkrSelect.defaultProps = {
  isObjective: true,
  disabled: false,
  loading: false,
};

export default RenderOkrSelect;
