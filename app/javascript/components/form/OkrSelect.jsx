import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Select, Button } from 'semantic-ui-react';
import OkrList from './OkrList';
import { okrOptions } from "../../utils/okr";

class OkrSelect extends PureComponent {

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

  handleChange = (event, { value }) => {
    if (value !== this.state.value) {
      this.props.onChange(value);
    }
  }

  render() {
    const showPreview = this.state.preview;
    return (
      <div className={`okr-select ${this.props.disabled ? 'disabled' : ''} ${showPreview ? 'preview' : ''}`}>
        {showPreview && (
          <OkrList
            okrs={this.props.okrs.filter(okr => okr.get('id') === this.state.value)}
            isObjective={this.props.isObjective}
          />
        )}
        {showPreview && !this.props.readOnly && (
          <Button content="変更する" size='small' onClick={() => this.setState({ preview: false })} />
        )}
        {!showPreview && (
          <Select
            search
            fluid
            options={okrOptions(this.props.okrs, !this.props.isObjective)}
            value={this.state.value}
            disabled={this.props.disabled || this.props.readOnly}
            loading={this.props.loading}
            onChange={this.handleChange}
            onBlur={() => this.setState({ preview: this.isPreview(this.props, this.state.value) })}
            selectOnNavigation={false}
            noResultsMessage='結果が見つかりません'
          />
        )}
      </div>
    );
  }
}

OkrSelect.propTypes = {
  // container
  // component
  okrs: ImmutablePropTypes.list.isRequired,
  isObjective: PropTypes.bool,
  value: PropTypes.number,
  preview: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
};

OkrSelect.defaultProps = {
  isObjective: true,
  value: null,
  preview: true,
  readOnly: false,
  disabled: false,
  loading: false,
  onChange: value => {},
};

export default OkrSelect;
