import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'semantic-ui-react';
import UserSelectBox from './UserSelectBox';

class KeyResultMemberSelectBox extends Component {
  selectedMembersTag({users, keyResultMembers, add, remove}) {
    const list = keyResultMembers.map((id, idx) => {
      const user = users.find(item => item.get('id') === id);
      return (
        <div key={idx} className="key-result-members__item">
          <span className="key-result-members__name">{`${user.get('lastName')} ${user.get('firstName')}`}</span>
          <Icon name="close" className="key-result-members__close" onClick={() => {remove(id)}} />
        </div>
      )
    });
    return <div className="key-result-members__selected">{list}</div>;
  }
  render() {
    const {
      users,
      keyResultMembers,
      add,
      remove,
    } = this.props;

    const selectableMembers = users.filter((item) => !keyResultMembers.includes(item.get('id')));
    console.log(1, selectableMembers)
    return (
      <div className="key-result-members">
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
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
};

export default KeyResultMemberSelectBox;
