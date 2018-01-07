import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import Avatar from './Avatar';

class KeyResultList extends Component {
  render() {
    return (
      <div className="key-result-list">
        <Table basic='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Key Result 名</Table.HeaderCell>
              <Table.HeaderCell>目標値</Table.HeaderCell>
              <Table.HeaderCell>実績値</Table.HeaderCell>
              <Table.HeaderCell>進捗率</Table.HeaderCell>
              <Table.HeaderCell>期限</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body className='key-result-table'>
            {this.props.keyResults.map((keyResult, key) =>
              <Table.Row key={key} active={keyResult === this.props.selectedKeyResult}
                         onClick={() => this.props.onSelectKeyResult(keyResult)}>
                <Table.Cell textAlign='center'><Avatar user={keyResult.get('owner')} size='small' /></Table.Cell>
                <Table.Cell>{keyResult.get('name')}</Table.Cell>
                <Table.Cell>{keyResult.get('targetValue')} {keyResult.get('valueUnit')}</Table.Cell>
                <Table.Cell>{keyResult.get('actualValue')} {keyResult.get('valueUnit')}</Table.Cell>
                <Table.Cell>{keyResult.get('progressRate')}%</Table.Cell>
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
  keyResults: PropTypes.object.isRequired,
  selectedKeyResult: PropTypes.object,
  onSelectKeyResult: PropTypes.func.isRequired,
};
KeyResultList.defaultProps = {
  selectedKeyResult: null,
};

export default KeyResultList;
