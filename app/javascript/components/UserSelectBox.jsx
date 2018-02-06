import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'semantic-ui-react';
import avatar_image from '../images/avatar.png';

class UserSelectBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.defaultValue,
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ defaultValue: nextProps.defaultValue });
  }

  userOptions = () => {
    return this.props.users.map(user => ({
      key: user.get('id'),
      value: user.get('id'),
      text: `${user.get('lastName')} ${user.get('firstName')}`,
      image: { avatar: true, src: user.get('avatarUrl') || avatar_image },
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
      <div>
        <Select
          key={this.props.id}
          search
          options={this.userOptions()}
          defaultValue={this.state.defaultValue}
          onChange={this.handleChange}
          loading={this.props.users.isEmpty()}
        />
      </div>
    )
  }
}

UserSelectBox.propTypes = {
  id: PropTypes.number,
  users: PropTypes.object.isRequired,
  defaultValue: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

export default UserSelectBox;
