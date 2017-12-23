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

    function collectAncestors(objective) {
      const parentId = objective.get('parentObjectiveId');
      if (parentId) {
        const parent = objectives.find(objective => objective.get('id') === parentId)
        okrGroups.unshift(List.of(parent));
        collectAncestors(parent);
      }
    }

    function collectDescendants(objective) {
      const childObjectives = objective.get('childObjectives');
      if (!childObjectives.isEmpty()) {
        okrGroups.push(childObjectives);
        childObjectives.map(child => collectDescendants(child));
      }
    }

    collectAncestors(objective);
    okrGroups.push(List.of(objective));
    collectDescendants(objective);
    return List.of(...okrGroups);
  }

  updateOkrPathProps() {
    const edgesList = this.state.okrGroups.map(okrGroup => (
      okrGroup.map(objective => {
        const element = findDOMNode(this.refs[this.getKey(objective)]);
        const x = element.offsetLeft + (element.offsetWidth / 2);
        return {
          top: { x: x, y: element.offsetTop },
          bottom: { x: x, y: element.offsetTop + element.offsetHeight },
          width: element.offsetParent.offsetWidth,
        };
      })
    ));

    // {top, bottom}, {top, bottom}... を1つずつずらした {bottom, top} から {from, to} の組み合わせを作る
    const okrPathPropsList = edgesList.map((edges, key, iter) => {
      if (key === 0) return;
      const prev = iter.get(key - 1).first();
      const top = prev.bottom.y;
      return {
        top: top,
        width: prev.width,
        height: edges.first().top.y - top,
        fromPoint: { x: prev.bottom.x, y: 0 },
        toPoints: edges.map(next => ({ x: next.top.x, y: next.top.y - top })),
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
      <div className='okr-map'>
        {this.state.okrGroups.map((okrGroup, key) => (
          <Card.Group key={key} className='okr-map__group'>
            {okrGroup.map((objective, key) => (
              <OkrCard
                key={key}
                objective={objective}
                isSelected={objective.get('id') === selectedId}
                ref={this.getKey(objective)}
              />
            ))}
          </Card.Group>
        ))}
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
