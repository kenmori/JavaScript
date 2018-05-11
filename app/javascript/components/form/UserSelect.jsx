import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { List } from 'immutable'
import { Select } from 'semantic-ui-react';
import avatar_image from '../../images/avatar.png';

class UserSelect extends PureComponent {

  userOptions = () => {
    return this.props.users.map(user => ({
      key: user.get('id'),
      value: user.get('id'),
      text: `${user.get('lastName')} ${user.get('firstName')}`,
      image: { avatar: true, src: user.get('avatarUrl') || avatar_image },
      email: user.get('email'),
    })).toArray();
  }

  handleChange = (event, { value }) => {
    let isChanged = false
    if (typeof value === 'number') {
      isChanged = this.props.value !== value
    } else {
      value = List.of(...value)
      isChanged = !this.props.value.equals(value)
    }
    if (isChanged) {
      this.props.onChange(value)
    }
  }

  search = (options, query) => {
    return options.filter(option => option.text.includes(query) || option.email.includes(query))
  }

  render() {
    const value = (typeof this.props.value === 'number') ? this.props.value : this.props.value.toArray()
    return (
      <div>
        <Select
          search={this.search}
          options={this.userOptions()}
          value={value}
          multiple={this.props.multiple}
          onChange={this.handleChange}
          loading={this.props.users.isEmpty()}
          selectOnNavigation={false}
          noResultsMessage='結果が見つかりません'
        />
      </div>
    );
  }
}

UserSelect.propTypes = {
  // container
  // component
  users: ImmutablePropTypes.list.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, ImmutablePropTypes.list]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

UserSelect.defaultProps = {
  multiple: false,
};

export default UserSelect;
