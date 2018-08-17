import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { openObjective, openKeyResult } from '../../utils/linker';
import { List } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import ProgressRate from '../util/ProgressRate'
import OkrName from '../util/OkrName'

class OkrList extends PureComponent {

  handleClick = id => () => {
    this.props.isObjective ? openObjective(id) : openKeyResult(id);
  }

  render() {
    return (
      <List className='okr-list'>
        {this.props.okrs.map(okr =>
          <List.Item key={okr.get('id')} className='okr-item'>
            <OwnerAvatar owner={okr.get('owner')} members={okr.get('members')} />
            <List.Content className='okr-list__name'>
              <a onClick={this.handleClick(okr.get('id'))}><OkrName okr={okr} /></a>
            </List.Content>
            <List.Content><ProgressRate value={okr.get('progressRate')} status={okr.get('status')} /></List.Content>
          </List.Item>
        )}
      </List>
    );
  }
}

OkrList.propTypes = {
  // container
  // component
  okrs: ImmutablePropTypes.list.isRequired,
  isObjective: PropTypes.bool,
};

OkrList.defaultProps = {
  isObjective: true,
};

export default OkrList;
