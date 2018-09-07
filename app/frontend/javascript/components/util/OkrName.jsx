import React, { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

class OkrName extends PureComponent {

  render() {
    const { okr } = this.props
    const isDisabled = okr.get('disabled')
    return (
      <span className={`okr-name ${isDisabled ? 'disabled' : ''}`}>
        <span className="okr-name__text">{okr.get('name')}</span>
      </span>
    )
  }
}

OkrName.propTypes = {
  // container
  // component
  okr: ImmutablePropTypes.map.isRequired,
}

export default OkrName
