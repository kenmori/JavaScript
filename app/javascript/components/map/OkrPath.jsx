import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon } from 'semantic-ui-react';

class OkrPath extends PureComponent {

  static CARD_MARGIN = 24; // OKR カード余白 (= 折れ線の段差の高さ、折り畳まれた線分の長さ)

  constructor(props) {
    super(props);
    this.state = { iconTopDiff: 0, iconLeftDiff: 0 }
  }

  componentDidMount() {
    const icon = findDOMNode(this.refs.icon);
    this.setState({ iconTopDiff: icon.offsetHeight / 2, iconLeftDiff: icon.offsetWidth / 2 })
  }

  getPointsList() {
    const { fromPoint: from, toPoints, isExpanded, toAncestor } = this.props
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
    const { fromPoint: from, toPoints, isExpanded, toAncestor } = this.props
    const to = toPoints.first()
    const [x, y] = isExpanded
      ? [from.x, to.y - OkrPath.CARD_MARGIN]
      : toAncestor
        ? [to.x, to.y - OkrPath.CARD_MARGIN]
        : [from.x, from.y + OkrPath.CARD_MARGIN]
    const { iconTopDiff, iconLeftDiff } = this.state
    return { top: y - iconTopDiff, left: x - iconLeftDiff }
  }

  handleIconClick = () => this.props.onToggleObjective(this.props)

  render() {
    const { isExpanded } = this.props
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
          ref='icon'
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
  fromPoint: PropTypes.object.isRequired, // {x, y}
  toPoints: ImmutablePropTypes.list.isRequired,
  toAncestor: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  fromId: PropTypes.number,
  onToggleObjective: PropTypes.func.isRequired,
  parentKeyResultId: PropTypes.number,
  keyResultIds: ImmutablePropTypes.list,
};

export default OkrPath;
