import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon } from 'semantic-ui-react';
import { List } from 'immutable'

class OkrPath extends PureComponent {

  static CARD_MARGIN = 24; // OKR カード余白 (= 折れ線の段差の高さ、折り畳まれた線分の長さ)
  static POINT_ZERO = { x: 0, y: 0 }

  constructor(props) {
    super(props);
    this.state = {
      iconTopDiff: 0,
      iconLeftDiff: 0,
      ...this.updateOkrPath(props),
    }
  }

  componentDidMount() {
    const icon = findDOMNode(this.icon);
    this.setState({
      iconTopDiff: icon.offsetHeight / 2,
      iconLeftDiff: icon.offsetWidth / 2,
      ...this.updateOkrPath(this.props),
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fromRef !== nextProps.fromRef || this.props.paths !== nextProps.paths) {
      this.setState(this.updateOkrPath(nextProps))
    }
  }

  updateOkrPath = ({ fromRef, paths }) => {
    let collapsedParent = false
    let expandedChild = false

    let fromPoint
    if (fromRef) {
      const element = findDOMNode(fromRef)
      const x = element.offsetLeft + (element.offsetWidth / 2)
      fromPoint = { x, y: element.offsetTop + element.offsetHeight }
    } else {
      collapsedParent = true
      fromPoint = OkrPath.POINT_ZERO
    }

    const toRefs = paths.flatMap(path => path.toRefs)
    let toPoints = toRefs.reduce((result, toRef) => {
      if (toRef) {
        const element = findDOMNode(toRef)
        const x = element.offsetLeft + (element.offsetWidth / 2)
        expandedChild = true
        result = result.push({ x, y: element.offsetTop })
      }
      return result
    }, List())
    if (toPoints.isEmpty()) {
      toPoints = toPoints.push(OkrPath.POINT_ZERO)
    }

    return {
      fromPoint,
      toPoints,
      toAncestor: collapsedParent,
      isExpanded: !collapsedParent && expandedChild,
    }
  }

  getPointsList() {
    const { fromPoint: from, toPoints, isExpanded, toAncestor } = this.state
    return toPoints.map(to => {
      if (isExpanded) {
        const iconY = to.y - OkrPath.CARD_MARGIN;
        return `${from.x},${from.y} ${from.x},${iconY} ${to.x},${iconY} ${to.x},${to.y}`;
      } else {
        return toAncestor
          ? `${to.x},${to.y - OkrPath.CARD_MARGIN} ${to.x},${to.y}`
          : `${from.x},${from.y} ${from.x},${from.y + OkrPath.CARD_MARGIN}`
      }
    })
  }

  getIconStyle() {
    const { fromPoint: from, toPoints, isExpanded, toAncestor } = this.state
    const to = toPoints.first()
    const [x, y] = isExpanded
      ? [from.x, to.y - OkrPath.CARD_MARGIN]
      : toAncestor
        ? [to.x, to.y - OkrPath.CARD_MARGIN]
        : [from.x, from.y + OkrPath.CARD_MARGIN]
    const { iconTopDiff, iconLeftDiff } = this.state
    return { top: y - iconTopDiff, left: x - iconLeftDiff }
  }

  handleIconRef = node => this.icon = node

  handleIconClick = () => {
    const { fromId, paths } = this.props
    const { toAncestor, isExpanded } = this.state
    const objectiveId = fromId
    const keyResultIds = paths.map(path => path.fromKeyResultId).toSet()
    this.props.onToggleObjective(toAncestor, isExpanded, objectiveId, keyResultIds)
  }

  render() {
    const { isExpanded } = this.state
    return (
      <div className='okr-path'>
        <svg>
          {this.getPointsList().map((points, key) => (
            <polyline
              key={key}
              points={points}
              strokeWidth='2'
              stroke='silver'
              fill='none'
            />
          ))}
        </svg>
        <Icon
          link
          name={`${isExpanded ? 'minus' : 'plus'} square outline`}
          size='large'
          ref={this.handleIconRef}
          fitted
          style={this.getIconStyle()}
          onClick={this.handleIconClick}
        />
      </div>
    );
  }
}

OkrPath.propTypes = {
  // container
  // component
  fromId: PropTypes.number.isRequired,
  fromRef: PropTypes.object,
  paths: ImmutablePropTypes.list.isRequired,
  onToggleObjective: PropTypes.func.isRequired,
};

export default OkrPath;
