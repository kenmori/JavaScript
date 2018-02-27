import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon, List } from 'semantic-ui-react';
import UserSelect from './UserSelect';
import Avatar from '../util/Avatar';

class KeyResultMemberSelect extends Component {
  selectedMembersTag({users, keyResultMembers, add, remove}) {
    const list = keyResultMembers.map(id => {
      const user = users.find(item => item.get('id') === id);
      return (
        <List.Item key={id} className="key-result-members-select-box__item">
          <Avatar user={user} size='tiny' useDefault={true} />
          <List.Content className="key-result-members-select-box__name">{`${user.get('lastName')} ${user.get('firstName')}`}</List.Content>
          <List.Content><Icon link name="close" className="key-result-members-select-box__close" onClick={() => {remove(id)}} /></List.Content>
        </List.Item>
      )
    });
    return <List horizontal className="key-result-members-select-box__selected">{list}</List>;
  }
  render() {
    const {
      users,
      keyResultMembers,
      includedId,
      excludedId,
      add,
      remove,
    } = this.props;

    const selectableMembers = users.filter(user => {
      const userId = user.get('id');
      return !keyResultMembers.includes(userId) && (includedId ? userId === includedId : userId !== excludedId);
    });
    return (
      <div className="key-result-members-select-box">
        { selectableMembers.size > 0 && 
            <UserSelect
              users={selectableMembers} 
              onChange={(value) => {add(value)}}
            />
        }
        {this.selectedMembersTag(this.props)}
      </div>
    )
  }
}

KeyResultMemberSelect.propTypes = {
  users: PropTypes.object.isRequired,
  keyResultMembers: PropTypes.array.isRequired,
  includedId: PropTypes.number,
  excludedId: PropTypes.number,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default KeyResultMemberSelect;
