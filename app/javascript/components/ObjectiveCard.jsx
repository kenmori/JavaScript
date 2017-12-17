import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import { Card, Icon, List } from 'semantic-ui-react';
import Avatar from '../containers/Avatar';

class ObjectiveCard extends Component {
  constructor(props) {
    super(props);
    this.state = { width: 0, height: 0, };
  }

  componentDidMount() {
    this.setWidthAndHeight();
  }

  componentDidUpdate(prevProps, _prevState) {
    if (prevProps !== this.props) {
      // コンポーネント描画後の width, height を取得するためこのタイミングで呼び出す
      this.setWidthAndHeight();
    }
  }

  setWidthAndHeight = () => {
    const card = findDOMNode(this.refs.card);
    this.setState({ width: card.offsetWidth, height: card.offsetHeight, });
  }

  generateKeyResultList(objective) {
    const keyResults = objective.get('keyResults');
    if (!keyResults || keyResults.isEmpty()) {
      return <Card.Content description='Key Result はありません' />;
    }
    return (
      <Card.Content className="keyResults">
        <List>
          {keyResults.map(keyResult =>
            <List.Item className="keyResults__item" key={keyResult.get('id')} onClick={() => this.props.openOkrFormModal(objective.get('id'), {okrType: 'keyResult', targetId: keyResult.get('id')})}>
              <Avatar user={keyResult.get('owner')} size='small' />
              <div className='name'>{keyResult.get('name')}</div>
              <div className="progress">{keyResult.get('progressRate')}%</div>
            </List.Item>
          )}
        </List>
      </Card.Content>
    );
  }

  removeObjective(objective) {
    if (objective.get('keyResults') && !objective.get('keyResults').isEmpty()) {
      alert('Key Result が紐付いているため削除できません。');
      return;
    }
    if (confirm(`Objective ${objective.get('name')} を削除しますか？`)) {
      this.props.removeObjective(objective.get('id'));
    }
  }

  pathSvg = (parentOrNot, drawOrNot) => {
    if (drawOrNot) {
      const top = parentOrNot ? '-22' : this.state.height;
      const x = Math.round(this.state.width / 2);
      return (
        <svg width={this.state.width} height='22' style={{ position: 'absolute', top: top }}>
          <line
            x1={x} y1='0'
            x2={x} y2='22'
            stroke='silver'
            strokeWidth='2'
            strokeDasharray='4,2'
          />
        </svg>
      );
    }
  }

  render() {
    const objective = this.props.objective;
    if (!objective || this.props.users.isEmpty()) {
      return null;
    }
    const user = this.props.users.find(user => user.get('ownerId') === objective.get('ownerId'));
    return (
      <Card className='objective-card' ref='card' color={this.props.isSelected ? 'red' : null}
            onClick={() => this.props.onSelect(objective.get('id'))}>
        <Card.Content>
          <Card.Header>
            <Avatar user={user} />
            <div className="name">{objective.get('name')}</div>
            <div className="progress">{objective.get('progressRate')}%</div>
          </Card.Header>
        </Card.Content>
        {this.generateKeyResultList(objective)}
        <Card.Content extra>
          <Icon link name='plus' onClick={() => this.props.openKeyResultFormModal(objective)} />
          <Icon link name='trash' onClick={() => this.removeObjective(objective)} />
          <Icon link name='write' onClick={() => this.props.openOkrFormModal(objective.get('id'), { okrType: 'objective' })} />
        </Card.Content>
        {this.pathSvg(true, !!objective.get('parentObjectiveId'))}
        {this.pathSvg(false, !objective.get('childObjectives').isEmpty())}
      </Card>
    );
  }
}

ObjectiveCard.propTypes = {
  objective: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default ObjectiveCard;