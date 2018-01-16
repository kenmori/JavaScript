import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, List } from 'semantic-ui-react';
import Avatar from '../../containers/Avatar';
import moment from 'moment';

class OkrCard extends Component {
  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult =>
            <List.Item className="keyResults__item" key={keyResult.get('id')}>
              <Avatar user={keyResult.get('owner')} size='small' />
              <div className='name'>
                <a onClick={() => this.props.openOkrFormModal(objective.get('id'), {
                  okrType: 'keyResult',
                  targetId: keyResult.get('id')
                })}>{keyResult.get('name')}</a>
              </div>
              <div className="progress">{keyResult.get('progressRate')}%</div>
            </List.Item>
          )}
          <List.Item className="keyResults__item--add">
            <List.List>
              <List.Item as='a' icon='plus' content='Key Result を追加する'
                         onClick={() => this.props.openKeyResultFormModal(objective)} />
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
      <Card className={`okr-card ${isSelected ? 'active' : ''}`}>
        <Card.Content>
          <Card.Header>
            <Avatar user={objective.get('owner')} />
            <div className="name">{objective.get('name')}</div>
            <div className="progress">{objective.get('progressRate')}%</div>
          </Card.Header>
        </Card.Content>
        {this.generateKeyResultList(objective)}
        <Card.Content extra className='okr-card__meta'>
          <div className='update-time'>{moment(objective.get('updatedAt')).format('YYYY/MM/DD')} 更新</div>
          <Icon link name='write' className='add-button' color='red' circular inverted
                onClick={() => this.props.openOkrFormModal(objective.get('id'), { okrType: 'objective' })} />
        </Card.Content>
      </Card>
    );
  }
}

OkrCard.propTypes = {
  objective: PropTypes.object.isRequired,
};

export default OkrCard;