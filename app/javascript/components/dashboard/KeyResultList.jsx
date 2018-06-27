import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import ProgressRate from '../util/ProgressRate'

class KeyResultList extends PureComponent {

  selectKeyResult = keyResult => () => this.props.selectKeyResult(keyResult)

  render() {
    return (
      <div className="key-result-list">
        <Table basic='very' compact='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Key Result</Table.HeaderCell>
              <Table.HeaderCell>目標値</Table.HeaderCell>
              <Table.HeaderCell>実績値</Table.HeaderCell>
              <Table.HeaderCell>進捗</Table.HeaderCell>
              <Table.HeaderCell>期限</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className='key-result-table'>
            {this.props.keyResults.map(keyResult =>
              <Table.Row key={keyResult.get('id')} active={keyResult.get('id') === this.props.selectedKeyResultId}
                         onClick={this.selectKeyResult(keyResult)}>
                <Table.Cell textAlign='center'><OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('members')} /></Table.Cell>
                <Table.Cell>{keyResult.get('name')}</Table.Cell>
                <Table.Cell>{keyResult.get('targetValue')} {keyResult.get('valueUnit')}</Table.Cell>
                <Table.Cell>{keyResult.get('actualValue')} {keyResult.get('valueUnit')}</Table.Cell>
                <Table.Cell><ProgressRate value={keyResult.get('progressRate')} status={keyResult.get('status')} /></Table.Cell>
                <Table.Cell>{keyResult.get('expiredDate')}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    );
  }
}

KeyResultList.propTypes = {
  // container
  selectedKeyResultId: PropTypes.number,
  selectKeyResult: PropTypes.func.isRequired,
  // component
  keyResults: ImmutablePropTypes.list.isRequired,
};

export default KeyResultList;
