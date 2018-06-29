import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Table, Button } from 'semantic-ui-react'
import SortableComponent from '../util/SortableComponent'
import OwnerAvatar from '../util/OwnerAvatar'

class TaskList extends SortableComponent {

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
    const { items } = this.state
    return (
      <div className="task-list">
        <Table basic='very' compact='very' selectable sortable>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell disabled />
              <Table.HeaderCell sorted={this.isSorted('name')} onClick={this.handleSort('name')}>
                Key Result
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('targetValue')} onClick={this.handleSort('targetValue')}>
                目標値
              </Table.HeaderCell>
              <Table.HeaderCell sorted={this.isSorted('expiredDate')} onClick={this.handleSort('expiredDate')}>
                期限
              </Table.HeaderCell>
              <Table.HeaderCell disabled />
            </Table.Row>
          </Table.Header>
          <Table.Body className='task-table'>
            {items.map(keyResult =>
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
  items: ImmutablePropTypes.list.isRequired,
}

export default TaskList
