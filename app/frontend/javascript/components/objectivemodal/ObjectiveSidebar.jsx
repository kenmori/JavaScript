import React, { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Item, Segment } from 'semantic-ui-react'
import OkrName from '../util/OkrName'
import Markdown from '../util/Markdown'

class ObjectiveSidebar extends PureComponent {

  render() {
    const { parentKeyResult } = this.props
    if (!parentKeyResult) return null
    const parentObjective = parentKeyResult.get('objective')
    return (
      <div className="objective-modal__sidebar">
        <Segment>
          <Item>
            <Item.Content>
              <Item.Header className="sidebar__title">上位 Objective</Item.Header>
              <Item.Header className="sidebar__name"><OkrName okr={parentObjective} /></Item.Header>
              <Item.Description className="sidebar__desc"><Markdown text={parentObjective.get('description')} /></Item.Description>
            </Item.Content>
          </Item>
        </Segment>

        <Segment>
          <Item>
            <Item.Content>
              <Item.Header className="sidebar__title">上位 Key Result</Item.Header>
              <Item.Header className="sidebar__name"><OkrName okr={parentKeyResult} /></Item.Header>
              <Item.Description className="sidebar__desc"><Markdown text={parentKeyResult.get('description')} /></Item.Description>
            </Item.Content>
          </Item>
        </Segment>
      </div>
    )
  }
}

ObjectiveSidebar.propTypes = {
  // container
  // component
  parentKeyResult: ImmutablePropTypes.map,
}

export default ObjectiveSidebar
