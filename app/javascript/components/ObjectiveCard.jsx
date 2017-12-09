import React, { Component } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';
import Avatar from '../containers/Avatar';

export default class ObjectiveCard extends Component {
  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    if (!keyResults || keyResults.isEmpty()) {
      return <Card.Content description='Key Result はありません' />;
    }
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult =>
            <List.Item className="keyResults__item" key={keyResult.get('id')} onClick={() => this.props.openOkrFormModal(objective.get('id'), {okrType: 'keyResult', targetId: keyResult.get('id')})}>
              <Avatar user={keyResult.get('owner')} size='small' />
              <div className='name'>{keyResult.get('name')}</div>
              <div className="progress">{keyResult.get('progressRate')}%</div>
            </List.Item>
          )}
        </List>
      </Card.Content>
    );
  }

  removeObjective(objective) {
    if (objective.get('keyResults') && !objective.get('keyResults').isEmpty()) {
      alert('Key Result が紐付いているため削除できません。');
      return;
    }
    if (confirm(`Objective ${objective.get('name')} を削除しますか？`)) {
      this.props.removeObjective(objective.get('id'));
    }
  }

  render() {
    const objective = this.props.objective;
    if (!objective || this.props.users.isEmpty()) {
      return null;
    }
    const user = this.props.users.find(user => user.get('ownerId') === objective.get('ownerId'));
    return (
      <Card key={objective.get('id')} className='objective-card'>
        <Card.Content>
          <Card.Header>
            <Avatar user={user} />
            <div className="name">{objective.get('name')}</div>
            <div className="progress">{objective.get('progressRate')}%</div>
          </Card.Header>
        </Card.Content>
        {this.generateKeyResultList(objective)}
        <Card.Content extra>
          <Icon link name='plus' onClick={() => this.props.openKeyResultFormModal(objective)} />
          <Icon link name='trash' onClick={() => this.removeObjective(objective)} />
          <Icon link name='write' onClick={() => this.props.openOkrFormModal(objective.get('id'), { okrType: 'objective' })} />
        </Card.Content>
      </Card>
    );
  }
};
