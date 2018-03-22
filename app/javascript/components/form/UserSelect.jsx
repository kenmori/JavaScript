import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import avatar_image from '../../images/avatar.png';

class UserSelect extends Component {

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
    const isChanged = typeof value === 'number'
      ? value !== this.props.value
      : JSON.stringify(value) !== JSON.stringify(this.props.value);
    if (isChanged) {
      this.props.onChange(value);
    }
  }

  search = (options, query) => {
    return options.filter(option => option.text.includes(query) || option.email.includes(query))
  }

  render() {
    return (
      <div>
        <Select
          search={this.search}
          options={this.userOptions()}
          value={this.props.value}
          multiple={this.props.multiple}
          onChange={this.handleChange}
          loading={this.props.users.isEmpty()}
          selectOnNavigation={false}
          noResultsMessage={null}
        />
      </div>
    );
  }
}

UserSelect.propTypes = {
  users: PropTypes.object.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
  multiple: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
};

UserSelect.defaultProps = {
  multiple: false,
};

export default UserSelect;
