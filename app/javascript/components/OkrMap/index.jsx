import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import OkrCard from '../../containers/OkrCard';
import OkrPath from './OkrPath';
import { Card } from 'semantic-ui-react';
import { List } from 'immutable'

class OkrMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      okrPathPropsList: null,
      okrGroups: this.createOkrGroups(props.objective, props.objectives),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.objective !== nextProps.objective) {
      this.setState({
        okrGroups: this.createOkrGroups(nextProps.objective, nextProps.objectives),
      });
    }
  }

  createOkrGroups(objective, objectives) {
    // TODO: 将来的には親と子だけでなく祖先や子孫も展開して描画できるようにする
    const okrGroups = [];

    function collectAncestors(objective, isVisible = false) {
      const parentId = objective.get('parentObjectiveId');
      if (parentId) {
        const parent = objectives.find(objective => objective.get('id') === parentId)
        okrGroups.unshift({ objectives: List.of(parent), isVisible: isVisible });
        collectAncestors(parent);
      }
    }

    function collectDescendants(objective, isVisible = false) {
      const childObjectives = objective.get('childObjectives');
      if (!childObjectives.isEmpty()) {
        okrGroups.push({ objectives: childObjectives, isVisible: isVisible });
        childObjectives.map(child => collectDescendants(child));
      }
    }

    collectAncestors(objective);
    okrGroups.push({ objectives: List.of(objective), isVisible: true });
    collectDescendants(objective, true);
    return List.of(...okrGroups);
  }

  updateOkrPathProps() {
    const map = findDOMNode(this.refs.map);

    const edgesList = this.state.okrGroups.reduce((result, okrGroup, key, iter) => {
      if (!okrGroup.isVisible) return result;

      if (key > 0) {
        const parent = iter.get(key - 1);
        if (!parent.isVisible) {
          // 非表示の親がいる場合
          result = result.push(List.of({
            top: { x: 0, y: 0 },
            bottom: { x: map.offsetWidth / 2, y: 0 },
            objectiveId: parent.objectives.first().get('id'),
          }));
        }
      }

      const edges = okrGroup.objectives.map(objective => {
        const element = findDOMNode(this.refs[this.getKey(objective)]);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        return {
          top: { x: x, y: element.offsetTop },
          bottom: { x: x, y: element.offsetTop + element.offsetHeight },
          objectiveId: objective.get('id'),
        };
      });
      result = result.push(edges);

      if (key < iter.size - 1) {
        const child = iter.get(key + 1);
        if (!child.isVisible) {
          // 非表示の子がいる場合
          result = result.push(List.of({
            top: { x: map.offsetWidth / 2, y: map.offsetHeight },
            bottom: { x: 0, y: 0 },
            objectiveId: child.objectives.first().get('id'),
          }));
        }
      }

      return result;
    }, List());

    // {top, bottom}, {top, bottom}... を1つずつずらした {bottom, top} から {from, to} の組み合わせを作る
    const okrPathPropsList = edgesList.map((edges, key, iter) => {
      if (key === 0) return null;
      const parent = iter.get(key - 1).first();
      const top = parent.bottom.y;
      return {
        top: top,
        width: map.offsetWidth,
        height: edges.first().top.y - top,
        fromPoint: { x: parent.bottom.x, y: 0 },
        toPoints: edges.map(current => ({ x: current.top.x, y: current.top.y - top })),
        objectiveId: parent.objectiveId,
      };
    }).skip(1);

    this.setState({
      okrPathPropsList: okrPathPropsList,
    });
  }

  componentDidUpdate(prevProps, _prevState) {
    // componentDidUpdateではsetStateするべきではないが、オブジェクティブ同士のパスを表示するには一度描画したあとにDOMの位置情報を更新する必要があるため許容する
    if (prevProps !== this.props) {
      this.updateOkrPathProps(this.props.objective);
    }
  }

  componentDidMount() {
    this.updateOkrPathProps(this.props.objective);
    window.addEventListener('resize', () => this.updateOkrPathProps(this.props.objective));
  }

  getKey = objective => {
    return `objective_${objective.get('id')}`;
  }

  render() {
    const selectedId = this.props.objective.get('id');
    return (
      <div className='okr-map' ref='map'>
        {this.state.okrGroups.map((okrGroup, key) => {
          if (!okrGroup.isVisible) return null;
          return (
            <Card.Group key={key} className='okr-map__group'>
              {okrGroup.objectives.map((objective, key) => (
                <OkrCard
                  key={key}
                  objective={objective}
                  isSelected={objective.get('id') === selectedId}
                  ref={this.getKey(objective)}
                />
              ))}
            </Card.Group>
          );
        })}
        {this.state.okrPathPropsList && this.state.okrPathPropsList.map((okrPathProps, key) => (
          <OkrPath key={key} {...okrPathProps} />
        ))}
      </div>
    );
  }
}

OkrMap.propTypes = {
  objective: PropTypes.object.isRequired,
  objectives: PropTypes.object.isRequired,
};

export default OkrMap;
