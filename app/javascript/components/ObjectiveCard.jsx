import React, { Component } from 'React';
import { Card } from 'semantic-ui-react';

export default class ObjectiveCard extends Component {
  render() {
    const objective = this.props.objective;
    if(!objective) {
      return <div></div>;
    }
    return (
      <Card key={objective.get('id')}>
        <Card.Content header={objective.get('name')}/>
        <Card.Content description={objective.get('description')}/>
      </Card>
    );
  }
};
