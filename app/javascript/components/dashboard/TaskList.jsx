import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table, Button } from 'semantic-ui-react'
import OwnerAvatar from '../util/OwnerAvatar'

class TaskList extends PureComponent {

  selectKeyResult = keyResult => () => this.props.selectKeyResult(keyResult)

  handleCreateClick = keyResult => event => {
    this.props.openObjectiveModal(keyResult)
    event.stopPropagation()
  }

  handleNotCreateClick = keyResult => event => {
    this.props.processKeyResult(keyResult.get('id'))
    event.stopPropagation()
  }

  render() {
    return (
      <div className="task-list">
        <Table basic='very' compact='very' selectable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell />
              <Table.HeaderCell>Key Result</Table.HeaderCell>
              <Table.HeaderCell>目標値</Table.HeaderCell>
              <Table.HeaderCell>期限</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body className='task-table'>
            {this.props.keyResults.map(keyResult =>
              <Table.Row key={keyResult.get('id')}
                         active={keyResult.get('id') === this.props.selectedKeyResultId}
                         onClick={this.selectKeyResult(keyResult)}>
                <Table.Cell textAlign='center'>
                  <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('members')} />
                </Table.Cell>
                <Table.Cell>{keyResult.get('name')}</Table.Cell>
                <Table.Cell>{keyResult.get('targetValue')} {keyResult.get('valueUnit')}</Table.Cell>
                <Table.Cell>{keyResult.get('expiredDate')}</Table.Cell>
                <Table.Cell>
                  <Button.Group>
                    <Button content='下位 OKR を作成する' positive onClick={this.handleCreateClick(keyResult)} />
                    <Button.Or />
                    <Button content='作成しない' onClick={this.handleNotCreateClick(keyResult)} />
                  </Button.Group>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    )
  }
}

TaskList.propTypes = {
  // container
  selectedKeyResultId: PropTypes.number,
  selectKeyResult: PropTypes.func.isRequired,
  openObjectiveModal: PropTypes.func.isRequired,
  processKeyResult: PropTypes.func.isRequired,
  // component
  keyResults: ImmutablePropTypes.list.isRequired,
}

export default TaskList
