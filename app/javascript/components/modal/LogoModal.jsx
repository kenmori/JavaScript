import React, { PureComponent } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import PropTypes from 'prop-types'

class LogoModal extends PureComponent {
  constructor() {
    super();
    this.state = {
      base64data: null
    }
  }
  toBase64(file) {
    const reader = new FileReader();
    reader.onload = (data) => {
      this.setState({
        base64data: data.target.result
      });
    }
    reader.readAsDataURL(file);
  }
  logoImage() {
    return this.state.base64data ?
      <img src={this.state.base64data} width="300" /> :
      <span>Loading...</span>
  }
  closeModal = () => {
    this.state.base64data = null;
    this.props.closeModal();
  }
  componentWillReceiveProps(nextProps) {
    nextProps.imageData && this.toBase64(nextProps.imageData)
  }
  render() {
    const {
      targetId,
      imageData,
      uploadLogoImage,
    } = this.props
    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='small' 
        onClose={this.props.closeModal}
      >
        <Modal.Content style={{ margin: '10px 0' }}>
          <div style={{textAlign: 'center'}}>
            {this.logoImage()}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.closeModal}>キャンセル</Button>
            <Button positive onClick={() => {uploadLogoImage(targetId, imageData)}}>OK</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
}

LogoModal.propTypes = {
  // container
  isOpen: PropTypes.bool.isRequired,
  imageData: PropTypes.object,
  targetId: PropTypes.number,
  uploadLogoImage: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  // component
}

export default LogoModal;
