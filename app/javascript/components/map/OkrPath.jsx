import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon } from 'semantic-ui-react';

class OkrPath extends PureComponent {

  static CARD_MARGIN = 24; // OKR カード余白 (= 折れ線の段差の高さ、折り畳まれた線分の長さ)

  constructor(props) {
    super(props);
    this.state = {
      iconTopDiff: 0,
      iconLeftDiff: 0,
    };
  }

  componentDidMount() {
    const icon = findDOMNode(this.refs.icon);
    this.setState({
      iconTopDiff: icon.offsetHeight / 2,
      iconLeftDiff: icon.offsetWidth / 2,
    });
  }

  getPointsList() {
    const from = this.props.fromPoint;
    if (this.props.isExpanded) {
      return this.props.toPoints.map(to => {
        const iconY = to.y - OkrPath.CARD_MARGIN;
        return `${from.x},${from.y} ${from.x},${iconY} ${to.x},${iconY} ${to.x},${to.y}`;
      });
    } else {
      return this.props.toPoints.map(to => (
        this.props.toAncestor
          ? `${to.x},${to.y - OkrPath.CARD_MARGIN} ${to.x},${to.y}`
          : `${from.x},${from.y} ${from.x},${from.y + OkrPath.CARD_MARGIN}`
      ));
    }
  }

  getIconStyle() {
    const from = this.props.fromPoint;
    const to = this.props.toPoints.first();
    let x;
    let y;
    if (this.props.isExpanded) {
      x = from.x;
      y = to.y - OkrPath.CARD_MARGIN;
    } else {
      if (this.props.toAncestor) {
        x = to.x;
        y = to.y - OkrPath.CARD_MARGIN;
      } else {
        x = from.x;
        y = from.y + OkrPath.CARD_MARGIN;
      }
    }
    return {
      top: y - this.state.iconTopDiff,
      left: x - this.state.iconLeftDiff,
    };
  }

  handleIconClick = () => this.props.onToggleObjective(this.props)

  render() {
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
        <Icon link name={`${this.props.isExpanded ? 'minus' : 'plus'} square outline`} size='large' ref='icon'
              style={this.getIconStyle()} onClick={this.handleIconClick} />
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
