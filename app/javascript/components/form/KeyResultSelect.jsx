import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Button } from 'semantic-ui-react';
import OkrList from './OkrList';
import avatar_image from '../../images/avatar.png';

class KeyResultSelect extends Component {

  constructor(props) {
    super(props);
    const value = props.defaultValue || -1;
    this.state = this.getState(value, props);
  }

  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.defaultValue || -1;
    if (this.props.defaultValue !== nextValue) {
      this.setState(this.getState(nextValue, nextProps));
    }
  }

  getState = (value, props) => {
    return {
      defaultValue: value,
      readOnly: props.readOnly && value !== -1,
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
      this.props.onChange(value);
    }
  }

  render() {
    const disabledClass = this.props.disabled ? 'disabled' : '';
    const readonlyClass = this.state.readOnly ? 'readonly' : '';
    return (
      <div className={`key-result-select ${disabledClass} ${readonlyClass}`}>
        {this.state.readOnly && (
          <OkrList
            okrs={this.props.keyResults.filter(keyResult => keyResult.get('id') === this.state.defaultValue)}
            isObjective={false}
          />
        )}
        {this.state.readOnly && (
          <Button content="変更する" size='small' onClick={() => this.setState({ readOnly: false })} />
        )}
        {!this.state.readOnly && (
          <Select
            search
            fluid
            options={this.keyResultOptions()}
            defaultValue={this.state.defaultValue}
            disabled={this.props.disabled}
            loading={this.props.loading}
            onChange={this.handleChange}
            onBlur={() => this.setState({ readOnly: this.props.readOnly || false })}
            selectOnNavigation={false}
          />
        )}
      </div>
    );
  }
}

KeyResultSelect.propTypes = {
  keyResults: PropTypes.object.isRequired,
  defaultValue: PropTypes.number,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

KeyResultSelect.defaultProps = {
  defaultValue: null,
  readOnly: false,
  disabled: false,
  loading: false,
};

export default KeyResultSelect;
