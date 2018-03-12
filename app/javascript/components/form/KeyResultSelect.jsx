import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import avatar_image from '../../images/avatar.png';

class KeyResultSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue || -1,
    };
  }

  keyResultOptions = () => {
    return this.props.keyResults.map(keyResult => ({
      key: keyResult.get('id'),
      value: keyResult.get('id'),
      text: keyResult.get('name'),
      image: { avatar: true, src: keyResult.get('owner').get('avatarUrl') || avatar_image },
    })).insert(0, ({
      key: -1,
      value: -1,
      text: 'なし',
    })).toArray();
  }

  handleChange = (event, { value }) => {
    if (value !== this.state.defaultValue) {
      this.setState({ defaultValue: value });
      this.props.onChange(value);
    }
  }

  render() {
    return (
      <div className={`key-result-select ${this.props.disabled ? 'disabled' : ''}`}>
        <Select
          search
          fluid
          options={this.keyResultOptions()}
          defaultValue={this.state.defaultValue}
          disabled={this.props.disabled}
          onChange={this.handleChange}
          loading={this.props.loading}
        />
      </div>
    );
  }
}

KeyResultSelect.propTypes = {
  keyResults: PropTypes.object.isRequired,
  defaultValue: PropTypes.number,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

KeyResultSelect.defaultProps = {
  defaultValue: null,
  disabled: false,
  loading: false,
};

export default KeyResultSelect;
