import React from 'React';
import { Card } from 'semantic-ui-react';

const KeyResultCard = ({ keyResult }) => {
  return (
    <Card key={keyResult.get('id')}>
      <Card.Content header={keyResult.get('name')}/>
      <Card.Content description={'description'}/>
    </Card>
  );
};

export default KeyResultCard;
