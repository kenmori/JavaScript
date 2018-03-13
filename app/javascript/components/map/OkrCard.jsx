import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { hashids, OKR_TYPE_ID } from '../../utils/hashids';
import { Card, Icon, List, Button } from 'semantic-ui-react';
import history from '../../utils/history';
import OwnerAvatar from '../util/OwnerAvatar';
import moment from 'moment';

class OkrCard extends Component {

  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    const showToggle = keyResults.some(keyResult => keyResult.get('childObjectiveIds').size > 0);
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult => {
            const keyResultId = keyResult.get('id');
            const okrHash = hashids.encode(OKR_TYPE_ID.KEY_RESULT, keyResultId);
            const isSelected = keyResultId === this.props.currentKeyResultId;
            const isToggleOn = this.props.visibleKeyResultIds && this.props.visibleKeyResultIds.includes(keyResultId);
            return (
              <List.Item className='keyResults__item' key={keyResultId} active={isSelected}>
                <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('keyResultMembers')}/>
                <div className='name'>
                  <a onClick={() => history.push(`/okr/${okrHash}`)}>{keyResult.get('name')}</a>
                </div>
                <div className="progress">{keyResult.get('progressRate')}%</div>
                {
                  showToggle &&
                  <div className={`toggle ${keyResult.get('childObjectiveIds').size === 0 ? 'no-child' : ''}`}>
                    <Button circular basic compact icon='sitemap' size='small'
                            active={isToggleOn}
                            onClick={() => this.props.onToggleKeyResult(objective.get('id'), keyResultId, isToggleOn)}
                    />
                  </div>
                }
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
    const okrHash = hashids.encode(OKR_TYPE_ID.OBJECTIVE, objective.get('id'));
    const isSelected = objective.get('id') === this.props.currentObjectiveId;
    return (
      <Card className={`okr-card ${isSelected ? 'active' : ''}`} raised>
        <Card.Content>
          <Card.Header>
            <OwnerAvatar owner={objective.get('owner')} size='large' />
            <div className="name">
              <a onClick={() => history.push(`/okr/${okrHash}`)}>{objective.get('name')}</a>
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
  visibleKeyResultIds: PropTypes.object,
  onToggleKeyResult: PropTypes.func.isRequired,
};

export default OkrCard;