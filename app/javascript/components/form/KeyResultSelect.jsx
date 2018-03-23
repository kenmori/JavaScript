import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Button } from 'semantic-ui-react';
import OkrList from './OkrList';
import avatar_image from '../../images/avatar.png';

class KeyResultSelect extends Component {

  constructor(props) {
    super(props);
    const value = props.value || -1;
    this.state = {
      value,
      preview: this.isPreview(props, value),
    };
  }

  componentWillReceiveProps(nextProps) {
    const nextValue = nextProps.value || -1;
    if (this.props.value !== nextValue) {
      this.setState({
        value: nextValue,
        preview: this.isPreview(nextProps, nextValue),
      });
    }
  }

  isPreview = (props, value) => {
    return props.preview && value !== -1; // 上位 KR なしの場合は常に Select 表示
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
    if (value !== this.state.value) {
      this.props.onChange(value);
    }
  }

  render() {
    const disabledClass = this.props.disabled ? 'disabled' : '';
    const previewClass = this.state.preview ? 'preview' : '';
    return (
      <div className={`key-result-select ${disabledClass} ${previewClass}`}>
        {this.state.preview && (
          <OkrList
            okrs={this.props.keyResults.filter(keyResult => keyResult.get('id') === this.state.value)}
            isObjective={false}
          />
        )}
        {this.state.preview && (
          <Button content="変更する" size='small' onClick={() => this.setState({ preview: false })} />
        )}
        {!this.state.preview && (
          <Select
            search
            fluid
            options={this.keyResultOptions()}
            value={this.state.value}
            disabled={this.props.disabled}
            loading={this.props.loading}
            onChange={this.handleChange}
            onBlur={() => this.setState({ preview: this.isPreview(this.props, this.state.value) })}
            selectOnNavigation={false}
          />
        )}
      </div>
    );
  }
}

KeyResultSelect.propTypes = {
  keyResults: PropTypes.object.isRequired,
  value: PropTypes.number,
  preview: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

KeyResultSelect.defaultProps = {
  value: null,
  preview: true,
  disabled: false,
  loading: false,
};

export default KeyResultSelect;
