import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import OkrLink from './OkrLink'

class OkrPath extends PureComponent {

  getPoints = () => {
    const { fromPoint: from, toPoint: to, isExpanded, toAncestor } = this.props
    if (isExpanded) {
      const iconY = to.y - OkrLink.CARD_MARGIN
      return `${from.x},${from.y} ${from.x},${iconY} ${to.x},${iconY} ${to.x},${to.y}`
    } else {
      return toAncestor
        ? `${to.x},${to.y - OkrLink.CARD_MARGIN} ${to.x},${to.y}`
        : `${from.x},${from.y} ${from.x},${from.y + OkrLink.CARD_MARGIN}`
    }
  }

  render() {
    const { isHighlighted, isMember } = this.props
    return (
      <polyline
        className={`${isHighlighted ? 'highlight' : ''} ${isMember ? 'member' : ''}`}
        points={this.getPoints()}
        strokeWidth="2"
        stroke="silver"
        fill="none"
      />
    )
  }
}

OkrPath.propTypes = {
  // container
  isHighlighted: PropTypes.bool.isRequired,
  isMember: PropTypes.bool.isRequired,
  // component
  fromKeyResultId: PropTypes.number.isRequired,
  toObjectiveId: PropTypes.number.isRequired,
  fromPoint: PropTypes.object.isRequired,
  toPoint: PropTypes.object.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  toAncestor: PropTypes.bool.isRequired,
}

export default OkrPath
