import React, { PureComponent } from 'react'
import { Button, Modal } from 'semantic-ui-react'
import PropTypes from 'prop-types'

class LogoModal extends PureComponent {
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
  logoImage() {
    return this.state.base64data ?
      <img src={this.state.base64data} width="300" /> :
      <span>Loading...</span>
  }
  closeModal = () => {
    this.state.base64data = null
    this.props.closeModal()
  }
  componentWillReceiveProps(nextProps) {
    nextProps.imageData && this.toBase64(nextProps.imageData)
  }

  handleClick = () => this.props.updateLogo(this.props.targetId, this.props.imageData)

  render() {
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='small' 
        onClose={this.props.closeModal}
      >
        <Modal.Content>{this.logoImage()}</Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.closeModal}>キャンセル</Button>
            <Button positive onClick={this.handleClick}>OK</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    )
  }
}

LogoModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  imageData: PropTypes.object, // File
  targetId: PropTypes.number,
  updateLogo: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // component
}

export default LogoModal
