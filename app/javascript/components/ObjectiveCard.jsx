import React, { Component } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

export default class ObjectiveCard extends Component {
  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    if (!keyResults || keyResults.isEmpty()) {
      return <Card.Content description='Key Result はありません'/>;
    }
    return (
      <Card.Content>
        <List bulleted>
          {keyResults.map(keyResult =>
            <List.Item key={keyResult.get('id')}>
              {keyResult.get('name')}
              <Icon link name='plus' color='red' onClick={() => { this.props.openObjectiveFormModal(objective, keyResult)}}/>
            </List.Item>
          )}
        </List>
      </Card.Content>
    );
  }

  removeObjective(objective) {
    if (confirm(`Objective ${objective.get('name')} を削除しますか？`)) {
      this.props.removeObjective(objective.get('id'));
    }
  }

  render() {
    const objective = this.props.objective;
    if (!objective) {
      return null;
    }
    if (this.props.users.isEmpty()) {
      return null;
    }
    const ownerName = this.props.users.find(user => user.get('ownerId') === objective.get('ownerId')).get('lastName');
    return (
      <Card key={objective.get('id')} className='objective-card'>
        <Card.Content>
          <Card.Header>
            <div className="avatar flex-center">{ownerName}</div>
            <div className="name">{objective.get('name')}</div>
            <div className="progress">{objective.get('progressRate')}%</div>
          </Card.Header>
        </Card.Content>
        {this.generateKeyResultList(objective)}
        <Card.Content extra>
          <Icon link name='plus' onClick={() => this.props.openKeyResultFormModal(objective)}/>
          <Icon link name='trash' onClick={() => this.removeObjective(objective)}/>
          <Icon link name='write' onClick={() => this.props.openObjectiveDetailModal(objective.get('id'))}/>
        </Card.Content>
      </Card>
    );
  }
};
