import React, { PureComponent } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class ImageModal extends PureComponent {
  constructor() {
    super()
    this.state = {
      base64data: null
    }
  }
  toBase64(file) {
    const reader = new FileReader()
    reader.onload = (data) => {
      this.setState({
        base64data: data.target.result
      })
    }
    reader.readAsDataURL(file)
  }
  image() {
    return this.state.base64data ?
      <img src={this.state.base64data} width="300" /> :
      <span>Loading...</span>
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen && !nextProps.isOpen) {
      this.setState({ base64data: null })
    }
    nextProps.data && this.toBase64(nextProps.data)
  }

  handleClick = () => this.props.updateImage(this.props.id, this.props.data, this.props.isAvatar)

  render() {
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size="mini"
        onClose={this.props.closeModal}
      >
        <Modal.Content>{this.image()}</Modal.Content>
        <Modal.Actions>
          <Button onClick={this.props.closeModal}>キャンセル</Button>
          <Button positive onClick={this.handleClick}>OK</Button>
        </ Modal.Actions >
      </ Modal >
    )
  }
}

ImageModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  id: PropTypes.number,
  data: PropTypes.object, // File
  isAvatar: PropTypes.bool.isRequired,
  updateImage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // component
}

export default ImageModal
