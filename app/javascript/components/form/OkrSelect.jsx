import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select, Button } from 'semantic-ui-react';
import OkrList from './OkrList';
import avatar_image from '../../images/avatar.png';

class OkrSelect extends Component {

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

  handleChange = (event, { value }) => {
    if (value !== this.state.value) {
      this.props.onChange(value);
    }
  }

  render() {
    const disabledClass = this.props.disabled ? 'disabled' : '';
    const previewClass = this.state.preview ? 'preview' : '';
    return (
      <div className={`okr-select ${disabledClass} ${previewClass}`}>
        {this.state.preview && (
          <OkrList
            okrs={this.props.okrs.filter(okr => okr.get('id') === this.state.value)}
            isObjective={this.props.isObjective}
          />
        )}
        {this.state.preview && !this.props.readOnly && (
          <Button content="変更する" size='small' onClick={() => this.setState({ preview: false })} />
        )}
        {!this.state.preview && (
          <Select
            search
            fluid
            options={this.okrOptions()}
            value={this.state.value}
            disabled={this.props.disabled || this.props.readOnly}
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

OkrSelect.propTypes = {
  okrs: PropTypes.object.isRequired,
  isObjective: PropTypes.bool,
  value: PropTypes.number,
  preview: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

OkrSelect.defaultProps = {
  isObjective: true,
  value: null,
  preview: true,
  readOnly: false,
  disabled: false,
  loading: false,
};

export default OkrSelect;
