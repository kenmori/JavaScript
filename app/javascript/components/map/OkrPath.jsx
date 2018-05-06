import React, { PureComponent } from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Icon } from 'semantic-ui-react';

class OkrPath extends PureComponent {
  static STEP_HEIGHT = 24; // 折れ線の段差の高さ
  static LINE_LENGTH = 24; // 折り畳まれた線分の長さ
  static BYPASS_WIDTH = 315 / 2 + 16; // 迂回路の幅

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
      let wrapped = false;
      const bypass = {
        x: this.props.toPoints.maxBy(to => to.x).x + OkrPath.BYPASS_WIDTH,
        y: this.props.toPoints.first().y - OkrPath.STEP_HEIGHT,
      }
      return this.props.toPoints.map((to, key, iter) => {
        if (!wrapped && key > 0 && to.x < iter.get(key - 1).x) {
          wrapped = true; // x 座標が前後している場合は折り返し表示と判定
        }
        const iconY = to.y - OkrPath.STEP_HEIGHT;
        return wrapped
          ? `${from.x},${from.y} ${from.x},${bypass.y} ${bypass.x},${bypass.y} ${bypass.x},${iconY} ${to.x},${iconY} ${to.x},${to.y}`
          : `${from.x},${from.y} ${from.x},${iconY} ${to.x},${iconY} ${to.x},${to.y}`;
      });
    } else {
      return this.props.toPoints.map(to => (
        this.props.toAncestor
          ? `${to.x},${to.y - OkrPath.LINE_LENGTH} ${to.x},${to.y}`
          : `${from.x},${from.y} ${from.x},${from.y + OkrPath.LINE_LENGTH}`
      ));
    }
  }

  getSvgStyle() {
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      pointerEvents: 'none',
    };
  }

  getIconStyle() {
    const from = this.props.fromPoint;
    const to = this.props.toPoints.first();
    let x;
    let y;
    if (this.props.isExpanded) {
      x = from.x;
      y = to.y - OkrPath.STEP_HEIGHT;
    } else {
      if (this.props.toAncestor) {
        x = to.x;
        y = to.y - OkrPath.LINE_LENGTH;
      } else {
        x = from.x;
        y = from.y + OkrPath.LINE_LENGTH;
      }
    }
    return {
      position: 'absolute',
      top: y - this.state.iconTopDiff,
      left: x - this.state.iconLeftDiff,
    };
  }

  render() {
    return (
      <div className='okr-path'>
        <svg width={this.props.width} height={this.props.height} style={this.getSvgStyle()}>
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
              style={this.getIconStyle()} onClick={() => this.props.onToggleObjective(this.props)} />
      </div>
    );
  }
}

OkrPath.propTypes = {
  // container
  // component
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  fromPoint: PropTypes.object.isRequired,
  toPoints: ImmutablePropTypes.list.isRequired,
  toAncestor: PropTypes.bool.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  fromId: PropTypes.number,
  onToggleObjective: PropTypes.func.isRequired,
  parentKeyResultId: PropTypes.number,
  keyResultIds: ImmutablePropTypes.list,
};

export default OkrPath;
