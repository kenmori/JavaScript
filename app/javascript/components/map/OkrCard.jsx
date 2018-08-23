import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { openObjective, openKeyResult } from '../../utils/linker'
import { Card, Icon, List } from 'semantic-ui-react'
import OwnerAvatar from '../util/OwnerAvatar'
import ProgressRate from '../util/ProgressRate'
import ToggleButton from '../util/ToggleButton'
import OkrName from '../util/OkrName'
import moment from 'moment'

class OkrCard extends PureComponent {

  handleObjectiveClick = () => openObjective(this.props.objective.get('id'))

  handleKeyResultClick = keyResultId => () => openKeyResult(keyResultId)

  handleToggleClick = (keyResult, isToggleOn) => () => this.props.toggleKeyResult(this.props.objective, keyResult, isToggleOn)

  handleAddKeyResultClick = () => this.props.openKeyResultModal(this.props.objective)

  handleObjectiveEnter = () => this.props.highlightObjective(this.props.objective)

  handleKeyResultEnter = keyResult => () => this.props.highlightKeyResult(keyResult)

  generateKeyResultList(objective) {
    const { selectedKeyResultId, highlightedKeyResultId, visibleKeyResultIds, unhighlightOkr } = this.props
    const keyResults = objective.get('keyResults')
    const showToggle = keyResults.some(keyResult => keyResult.get('childObjectiveIds').size > 0)
    return (
      <Card.Content className="key-results">
        <List>
          {keyResults.map(keyResult => {
            const keyResultId = keyResult.get('id')
            const isSelected = keyResultId === selectedKeyResultId
            const isHighlighted = keyResultId === highlightedKeyResultId
            const isToggleOn = visibleKeyResultIds ? visibleKeyResultIds.includes(keyResultId) : false
            return (
              <List.Item className="key-results__item" key={keyResultId} active={isSelected}>
                <OwnerAvatar owner={keyResult.get('owner')} members={keyResult.get('members')}/>
                <div className={`okr-card__name ${isHighlighted ? 'highlight' : ''}`}>
                  <a
                    onClick={this.handleKeyResultClick(keyResultId)}
                    onMouseEnter={this.handleKeyResultEnter(keyResult)}
                    onMouseLeave={unhighlightOkr}
                  ><OkrName okr={keyResult} /></a>
                </div>
                <ProgressRate value={keyResult.get('progressRate')} status={keyResult.get('status')} />

                {showToggle && (
                  <ToggleButton
                    on={isToggleOn}
                    visible={keyResult.get('childObjectiveIds').size > 0}
                    onClick={this.handleToggleClick(keyResult, isToggleOn)}
                  />
                )}
              </List.Item>
            )
          })}
          {keyResults.isEmpty() && (
            <List.Item className="key-results__item--add">
              <List.List>
                <List.Item as="a" icon="plus" content="Key Result を追加する" onClick={this.handleAddKeyResultClick} />
              </List.List>
            </List.Item>
          )}
        </List>
      </Card.Content>
    )
  }

  render() {
    const { objective, selectedObjectiveId, highlightedObjectiveIds, unhighlightOkr } = this.props
    const objectiveId = objective.get('id')
    const isSelected = objectiveId === selectedObjectiveId
    const isHighlighted = highlightedObjectiveIds.includes(objectiveId)
    return (
      <Card className={`okr-card ${isSelected ? 'active' : ''}`} raised>
        <Card.Content className="objective">
          <Card.Header>
            <OwnerAvatar owner={objective.get('owner')} size='large' />
            <div className={`okr-card__name ${isHighlighted ? 'highlight' : ''}`}>
              <a
                onClick={this.handleObjectiveClick}
                onMouseEnter={this.handleObjectiveEnter}
                onMouseLeave={unhighlightOkr}
              ><OkrName okr={objective} /></a>
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
    )
  }
}

OkrCard.propTypes = {
  // container
  selectedObjectiveId: PropTypes.number,
  selectedKeyResultId: PropTypes.number,
  highlightedObjectiveIds: ImmutablePropTypes.list.isRequired,
  highlightedKeyResultId: PropTypes.number,
  visibleKeyResultIds: ImmutablePropTypes.set,
  openKeyResultModal: PropTypes.func.isRequired,
  highlightObjective: PropTypes.func.isRequired,
  highlightKeyResult: PropTypes.func.isRequired,
  unhighlightOkr: PropTypes.func.isRequired,
  toggleKeyResult: PropTypes.func.isRequired,
  // component
  objective: ImmutablePropTypes.map.isRequired,
}

export default OkrCard