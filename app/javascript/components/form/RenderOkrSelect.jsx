import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Label } from 'semantic-ui-react';
import avatar_image from '../../images/avatar.png';

class RenderOkrSelect extends Component {

  okrOptions = () => {
    let options = this.props.okrs.map(okr => ({
      key: okr.get('id'),
      value: okr.get('id'),
      text: okr.get('name'),
      image: { avatar: true, src: okr.get('owner').get('avatarUrl') || avatar_image },
    }));
    if (!this.props.isObjective) {
      // 上位 KR なしの選択肢を追加 (紐付く Objective なしは選ばせない)
      options = options.insert(0, ({
        key: -1,
        value: -1,
        text: 'なし',
      }));
    }
    return options.toArray();
  }

  render() {
    const {
      input: { value, onChange, onBlur },
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
            options={this.okrOptions()}
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
