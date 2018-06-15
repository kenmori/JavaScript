import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Radio } from 'semantic-ui-react'

class StatusRadio extends PureComponent {

  render() {
    const { status, onChange } = this.props
    return (
      <div className="status-radio">
        <Radio
          className="green"
          toggle
          label="順調"
          name="status"
          value="green"
          checked={status === 'green'}
          onChange={onChange}
        />
        <Radio
          className="yellow"
          toggle
          label="注意"
          name="status"
          value="yellow"
          checked={status === 'yellow'}
          onChange={onChange}
        />
        <Radio
          className="red"
          toggle
          label="危険"
          name="status"
          value="red"
          checked={status === 'red'}
          onChange={onChange}
        />
      </div>
    )
  }
}

StatusRadio.propTypes = {
  // container
  // component
  status: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default StatusRadio
