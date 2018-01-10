import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import UserSelectBox from './UserSelectBox';

class KeyResultMemberSelectBox extends Component {
  selectedMembersTag({users, keyResultMembers, add, remove}) {
    const list = keyResultMembers.map((id, idx) => {
      const user = users.find(item => item.get('id') === id);
      return (
        <div key={idx} className="key-result-members-select-box__item">
          <span className="key-result-members-select-box__name">{`${user.get('lastName')} ${user.get('firstName')}`}</span>
          <Icon name="close" className="key-result-members-select-box__close" onClick={() => {remove(id)}} />
        </div>
      )
    });
    return <div className="key-result-members-select-box__selected">{list}</div>;
  }
  render() {
    const {
      users,
      keyResultMembers,
      ownerId,
      add,
      remove,
    } = this.props;

    const selectableMembers = users.filter(user => {
      const userId = user.get('id');
      return !keyResultMembers.includes(userId) && userId !== ownerId;
    });
    return (
      <div className="key-result-members-select-box">
        {this.selectedMembersTag(this.props)}
        { selectableMembers.size > 0 && 
            <UserSelectBox
              users={selectableMembers} 
              onChange={(value) => {add(value)}}
            />
        }
      </div>
    )
  }
}

KeyResultMemberSelectBox.propTypes = {
  users: PropTypes.object.isRequired,
  keyResultMembers: PropTypes.array.isRequired,
  ownerId: PropTypes.number,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default KeyResultMemberSelectBox;
