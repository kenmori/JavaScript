import { PureComponent } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

class SortableComponent extends PureComponent {

  constructor(props) {
    super(props)
    this.state = {
      column: null,
      direction: null,
      items: props.items,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({ items: this.sort(nextProps.items, this.state.column, this.state.direction) })
    }
  }

  sort = (items, column, direction) => {
    const sortedItems = items.sort((a, b) => {
      if (typeof a.get(column) === 'string') {
        return a.get(column).localeCompare(b.get(column))
      } else {
        if (a.get(column) < b.get(column)) return -1
        if (a.get(column) > b.get(column)) return 1
        if (a.get(column) === b.get(column)) return 0
      }
    })
    return direction === 'ascending' ? sortedItems : sortedItems.reverse()
  }

  handleSort = newColumn => () => {
    const { column, direction, items } = this.state
    const newDirection = column !== newColumn ? 'ascending' : direction === 'ascending' ? 'descending' : 'ascending'
    this.setState({
      column: newColumn,
      direction: newDirection,
      items: this.sort(items, newColumn, newDirection),
    })
  };

  isSorted = newColumn => this.state.column === newColumn ? this.state.direction : null
}

SortableComponent.propTypes = {
  // component
  items: ImmutablePropTypes.list.isRequired,
}

export default SortableComponent
