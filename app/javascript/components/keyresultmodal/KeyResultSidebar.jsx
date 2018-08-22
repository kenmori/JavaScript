import React, { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Item, Segment } from 'semantic-ui-react'
import OkrName from '../util/OkrName'
import Markdown from '../util/Markdown'

class KeyResultSidebar extends PureComponent {

  render() {
    const { objective } = this.props
    if (!objective) return null
    const parentKeyResult = objective.get('parentKeyResult')
    return (
      <div className="keyresult-modal__sidebar">
        {parentKeyResult && (
          <Segment>
            <Item>
              <Item.Content>
                <Item.Header className="sidebar__title">上位 Key Result</Item.Header>
                <Item.Header className="sidebar__name"><OkrName okr={parentKeyResult} /></Item.Header>
                <Item.Description className="sidebar__desc"><Markdown text={parentKeyResult.get('description')} /></Item.Description>
              </Item.Content>
            </Item>
          </Segment>
        )}

        <Segment>
          <Item>
            <Item.Content>
              <Item.Header className="sidebar__title">紐付く Objective</Item.Header>
              <Item.Header className="sidebar__name"><OkrName okr={objective} /></Item.Header>
              <Item.Description className="sidebar__desc"><Markdown text={objective.get('description')} /></Item.Description>
            </Item.Content>
          </Item>
        </Segment>
      </div>
    )
  }
}

KeyResultSidebar.propTypes = {
  // container
  // component
  objective: ImmutablePropTypes.map,
}

export default KeyResultSidebar
