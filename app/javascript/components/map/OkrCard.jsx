import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, List } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import moment from 'moment';

class OkrCard extends Component {
  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult => {
            const isSelected = keyResult.get('id') === this.props.currentKeyResultId;
            return (
              <List.Item className='keyResults__item' key={keyResult.get('id')} active={isSelected}>
                <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')}/>
                <div className='name'>
                  <a onClick={() => this.props.openOkrModal(objective.get('id'), {
                    okrType: 'keyResult',
                    targetId: keyResult.get('id')
                  })}>{keyResult.get('name')}</a>
                </div>
                <div className="progress">{keyResult.get('progressRate')}%</div>
              </List.Item>
            );
          })}
          <List.Item className="keyResults__item--add">
            <List.List>
              <List.Item as='a' icon='plus' content='Key Result を追加する'
                         onClick={() => this.props.openKeyResultModal(objective)} />
            </List.List>
          </List.Item>
        </List>
      </Card.Content>
    );
  }

  render() {
    const objective = this.props.objective;
    const isSelected = objective.get('id') === this.props.currentObjectiveId;
    return (
      <Card className={`okr-card ${isSelected ? 'active' : ''}`} raised>
        <Card.Content>
          <Card.Header>
            <OwnerAvatar owner={objective.get('owner')} size='large' />
            <div className="name">
              <a onClick={() => this.props.openOkrModal(objective.get('id'), { okrType: 'objective' })}>
                {objective.get('name')}
              </a>
            </div>
            <div className="progress">{objective.get('progressRate')}%</div>
          </Card.Header>
        </Card.Content>
        {this.generateKeyResultList(objective)}
        <Card.Content extra className='okr-card__meta' textAlign='right'>
          <div className='update-time'>
            <Icon name='time' />
            {moment(objective.get('updatedAt')).format('YYYY/M/D')} 更新
          </div>
        </Card.Content>
      </Card>
    );
  }
}

OkrCard.propTypes = {
  objective: PropTypes.object.isRequired,
};

export default OkrCard;