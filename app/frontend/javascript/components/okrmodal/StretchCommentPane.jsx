import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import OkrComment from './OkrComment'
// import { Form, Dropdown } from 'semantic-ui-react'

class StretchCommentPane extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      displayCommentCount : 3
    }
  }

  handleDisplayComment = (value) => {
    this.setState({ displayCommentCount: this.state.displayCommentCount + value })
  }

  render() {
    const {comments, keyResultCommentLables, onDelete, onUpdate}  = this.props
    const viewComments = comments.filter((el, index) => {
      return index < this.state.displayCommentCount
    })

    return (
      <div>
        {viewComments ?
          viewComments.map(comment => {
            return( 
              <OkrComment
                key={comment.get('id')}
                comment={comment}
                commentLables={keyResultCommentLables}
                onDelete={onDelete}
                onUpdate={onUpdate}
              />
            )
          })
          : null
        }
        {comments.size > this.state.displayCommentCount
          ? (
            <div onClick={() => this.handleDisplayComment(5)}>さらに表示</div>
          ) : null
        }
      </div>
    )
  }
}

StretchCommentPane.propTypes = {
  // container
  // component
  keyResultCommentLables: ImmutablePropTypes.list.isRequired,
  comments: ImmutablePropTypes.list.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
}

export default StretchCommentPane
