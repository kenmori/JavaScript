import React, { Component } from 'react';
import { Card, Icon, List } from 'semantic-ui-react';

export default class ObjectiveCard extends Component {
  generateKeyResultList = objective => {
    const keyResults = objective.get('keyResults');
    if (!keyResults || keyResults.isEmpty()) {
      return <Card.Content description='Key Result はありません'/>;
    }
    return (
      <Card.Content>
        <List bulleted>
          {keyResults.map(keyResult =>
            <List.Item key={keyResult.get('id')}>{keyResult.get('name')}</List.Item>
          )}
        </List>
      </Card.Content>
    );
  };

  render() {
    const objective = this.props.objective;
    if (!objective) {
      return null;
    }
    return (
      <Card key={objective.get('id')}>
        <Card.Content header={objective.get('name')}/>
        {this.generateKeyResultList(objective)}
        <Card.Content extra>
          <Icon link name='plus' onClick={() => this.props.openKeyResultFormModal(objective)}/>
          <Icon link name='trash' onClick={() => this.props.removeObjective(objective.get('id'))}/>
          <Icon link name='write' onClick={() => this.props.openObjectiveDetailModal(objective.get('id'))}/>
        </Card.Content>
      </Card>
    );
  }
};
