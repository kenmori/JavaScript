import React from 'React';
import { Card } from 'semantic-ui-react';

const ObjectiveCard = ({ objective }) => {
  if (!objective) {
    return <div></div>;
  }
  return (
    <Card key={objective.get('id')}>
      <Card.Content header={objective.get('name')}/>
      <Card.Content description={'description'}/>
    </Card>
  );
};

export default ObjectiveCard;