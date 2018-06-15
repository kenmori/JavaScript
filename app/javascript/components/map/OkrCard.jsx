import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { openObjective, openKeyResult } from '../../utils/linker';
import { Card, Icon, List, Button } from 'semantic-ui-react';
import OwnerAvatar from '../util/OwnerAvatar';
import ProgressRate from '../util/ProgressRate'
import moment from 'moment';

class OkrCard extends PureComponent {

  handleObjectiveClick = () => openObjective(this.props.objective.get('id'))

  handleKeyResultClick = keyResultId => () => openKeyResult(keyResultId)

  handleToggleClick = (keyResultId, isToggleOn) => () => this.props.onToggleKeyResult(this.props.objective.get('id'), keyResultId, isToggleOn)

  handleAddKeyResultClick = () => this.props.openKeyResultModal(this.props.objective)

  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    const showToggle = keyResults.some(keyResult => keyResult.get('childObjectiveIds').size > 0);
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult => {
            const keyResultId = keyResult.get('id');
            const isSelected = keyResultId === this.props.selectedKeyResultId;
            const isToggleOn = this.props.visibleKeyResultIds && this.props.visibleKeyResultIds.includes(keyResultId);
            return (
              <List.Item className='keyResults__item' key={keyResultId} active={isSelected}>
                <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('members')}/>
                <div className='okr-card__name'>
                  <a onClick={this.handleKeyResultClick(keyResultId)}>{keyResult.get('name')}</a>
                </div>
                <ProgressRate value={keyResult.get('progressRate')} status={keyResult.get('status')} />
                {
                  showToggle &&
                  <div className={`toggle ${keyResult.get('childObjectiveIds').size === 0 ? 'no-child' : ''}`}>
                    <Button circular basic compact icon='sitemap' size='small'
                            active={isToggleOn}
                            onClick={this.handleToggleClick(keyResultId, isToggleOn)}
                    />
                  </div>
                }
              </List.Item>
            );
          })}
          {keyResults.isEmpty() && (
            <List.Item className="keyResults__item--add">
              <List.List>
                <List.Item as='a' icon='plus' content='Key Result を追加する'
                           onClick={this.handleAddKeyResultClick} />
              </List.List>
            </List.Item>
          )}
        </List>
      </Card.Content>
    );
  }

  render() {
    const objective = this.props.objective;
    const isSelected = objective.get('id') === this.props.selectedObjectiveId;
    return (
      <Card className={`okr-card ${isSelected ? 'active' : ''}`} raised>
        <Card.Content>
          <Card.Header>
            <OwnerAvatar owner={objective.get('owner')} size='large' />
            <div className="okr-card__name">
              <a onClick={this.handleObjectiveClick}>{objective.get('name')}</a>
            </div>
            <ProgressRate value={objective.get('progressRate')} />
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
  // container
  selectedObjectiveId: PropTypes.number.isRequired,
  selectedKeyResultId: PropTypes.number,
  openKeyResultModal: PropTypes.func.isRequired,
  // component
  objective: ImmutablePropTypes.map.isRequired,
  visibleKeyResultIds: ImmutablePropTypes.set,
  onToggleKeyResult: PropTypes.func.isRequired,
};

export default OkrCard;