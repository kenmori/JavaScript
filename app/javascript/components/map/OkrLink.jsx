import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon } from 'semantic-ui-react';
import { List } from 'immutable'
import OkrPath from './OkrPath'

class OkrLink extends PureComponent {

  static CARD_MARGIN = 24; // OKR カード余白 (= 折れ線の段差の高さ、折り畳まれた線分の長さ)
  static POINT_ZERO = { x: 0, y: 0 }

  constructor(props) {
    super(props);
    this.state = {
      iconTopDiff: 0,
      iconLeftDiff: 0,
      ...this.updateOkrLink(props),
    }
  }

  componentDidMount() {
    const icon = findDOMNode(this.icon);
    this.setState({
      iconTopDiff: icon.offsetHeight / 2,
      iconLeftDiff: icon.offsetWidth / 2,
      ...this.updateOkrLink(this.props),
    })
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.fromRef !== nextProps.fromRef || this.props.paths !== nextProps.paths) {
      this.setState(this.updateOkrLink(nextProps))
    }
  }

  updateOkrLink = ({ fromRef, paths }) => {
    let collapsedParent = false
    let expandedChild = false

    let fromPoint
    if (fromRef) {
      const element = findDOMNode(fromRef)
      const x = element.offsetLeft + (element.offsetWidth / 2)
      fromPoint = { x, y: element.offsetTop + element.offsetHeight }
    } else {
      collapsedParent = true
      fromPoint = OkrLink.POINT_ZERO
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
      toPoints = toPoints.push(OkrLink.POINT_ZERO)
    }

    return {
      fromPoint,
      toPoints,
      toAncestor: collapsedParent,
      isExpanded: !collapsedParent && expandedChild,
    }
  }

  getIconStyle() {
    const { fromPoint: from, toPoints, isExpanded, toAncestor } = this.state
    const to = toPoints.first()
    const [x, y] = isExpanded
      ? [from.x, to.y - OkrLink.CARD_MARGIN]
      : toAncestor
        ? [to.x, to.y - OkrLink.CARD_MARGIN]
        : [from.x, from.y + OkrLink.CARD_MARGIN]
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
    const { fromPoint, toPoints, isExpanded, toAncestor } = this.state
    return (
      <div className='okr-link'>
        <svg>
          {toPoints.map((toPoint, key) => (
            <OkrPath
              key={key}
              fromPoint={fromPoint}
              toPoint={toPoint}
              isExpanded={isExpanded}
              toAncestor={toAncestor}
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

OkrLink.propTypes = {
  // container
  // component
  fromId: PropTypes.number.isRequired,
  fromRef: PropTypes.object,
  paths: ImmutablePropTypes.list.isRequired,
  onToggleObjective: PropTypes.func.isRequired,
};

export default OkrLink;
