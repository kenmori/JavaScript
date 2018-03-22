import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UserSelect from './UserSelect';

class KeyResultMemberSelect extends Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultValue: props.members,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.members !== nextProps.members) {
      this.setState({ defaultValue: nextProps.members });
    }
  }

  handleChange = value => {
    if (value.length > this.state.defaultValue.length) {
      const addedId = value.find(id => !this.state.defaultValue.includes(id));
      this.props.add(addedId);
    } else if (value.length < this.state.defaultValue.length) {
      const removedId = this.state.defaultValue.find(id => !value.includes(id));
      this.props.remove(removedId);
    }
  }

  render() {
    const {
      users,
      members,
      includedId,
      excludedId,
    } = this.props;

    const selectableUsers = users.filter(user => {
      const userId = user.get('id');
      return includedId ? userId === includedId : userId !== excludedId;
    });

    return (
      <div className="key-result-member-select">
        <UserSelect
          users={selectableUsers}
          defaultValue={members}
          multiple={true}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

KeyResultMemberSelect.propTypes = {
  users: PropTypes.object.isRequired,
  members: PropTypes.array.isRequired,
  includedId: PropTypes.number,
  excludedId: PropTypes.number,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default KeyResultMemberSelect;
