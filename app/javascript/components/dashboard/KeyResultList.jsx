import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';

class KeyResultList extends Component {

  selectKeyResult = keyResult => {
    const objective = keyResult.get('objective')
    const objectiveId = keyResult.get('objectiveId');
    if (objective) {
      this.props.setMapObjective(objective);
    } else {
      // 他人の Objective の場合
      this.props.setMapObjectiveId(objectiveId);
      this.props.fetchObjective(objectiveId);
    }
    this.props.changeCurrentOkr(objectiveId, keyResult.get('id'));
  }

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
            {this.props.keyResults.map((keyResult, key) =>
              <Table.Row key={key} active={keyResult.get('id') === this.props.currentKeyResultId}
                         onClick={() => this.selectKeyResult(keyResult)}>
                <Table.Cell textAlign='center'><OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')} /></Table.Cell>
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
  setMapObjective: PropTypes.func.isRequired,
  setMapObjectiveId: PropTypes.func.isRequired,
};

export default KeyResultList;
