import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react';

export default class ObjectiveCard extends Component {
  render() {
    const objective = this.props.objective;
    if(!objective) {
      return <div></div>;
    }
    return (
      <Card key={objective.get('id')}>
        <Card.Content header={objective.get('name')}/>
        <Card.Content description={`KeyResults: ${objective.get('keyResults').size}`}/>
        <Card.Content extra>
          <Icon link name='plus' onClick={() => this.props.openKeyResultFormModal(objective)}/>
          <Icon link name='trash' onClick={() => this.props.removeObjective(objective.get('id'))}/>
          <Icon link name='write' onClick={() => this.props.openObjectiveDetailModal(objective.get('id'))}/>
        </Card.Content>
      </Card>
    );
  }
};
