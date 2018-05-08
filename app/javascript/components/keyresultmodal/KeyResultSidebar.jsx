import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { List } from 'semantic-ui-react'

class KeyResultSidebar extends PureComponent {

  render() {
    const { objective } = this.props
    if (!objective) return null
    const parentKeyResult = objective.get('parentKeyResult')
    return (
      <div className="keyresult-modal__sidebar">
        {parentKeyResult && (
          <div className="sidebar__item">
            <div className="sidebar__title">上位 Key Result</div>
            <div className="sidebar__content">
              <List>
                <List.Item>
                  <List.Content>
                    <List.Header>{parentKeyResult.get('name')}</List.Header>
                    <List.Description>{parentKeyResult.get('description')}</List.Description>
                  </List.Content>
                </List.Item>
              </List>
            </div>
          </div>
        )}
        <div className="sidebar__item">
          <div className="sidebar__title">紐付く Objective</div>
          <div className="sidebar__content">
            <List>
              <List.Item>
                <List.Content>
                  <List.Header>{objective.get('name')}</List.Header>
                  <List.Description>{objective.get('description')}</List.Description>
                </List.Content>
              </List.Item>
            </List>
          </div>
        </div>
      </div>
    )
  }
}

KeyResultSidebar.propTypes = {
  objective: PropTypes.object,
}

export default KeyResultSidebar
