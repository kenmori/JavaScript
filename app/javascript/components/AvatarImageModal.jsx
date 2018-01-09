import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Icon, Input, Modal, Select, TextArea } from 'semantic-ui-react';

class AvatarImageModal extends Component {
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
  avatarImage() {
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
      closeModal,
      uploadAvatarImage,
    } = this.props

    return (
      <Modal
        closeIcon 
        open={this.props.isOpen} 
        size='small' 
        className='okr-form-modal' 
        closeOnEscape={true} 
        closeOnRootNodeClick={true} 
        onClose={() => this.props.closeModal()}
      >
        <Modal.Content style={{ margin: '10px 0' }}>
          <div style={{textAlign: 'center'}}>
            {this.avatarImage()}
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button onClick={this.closeModal}>キャンセル</Button>
            <Button positive onClick={() => {uploadAvatarImage(targetId, imageData)}}>OK</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
}
;

export default AvatarImageModal;
