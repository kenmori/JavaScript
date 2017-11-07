import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Icon, Input, Modal, Select, TextArea } from 'semantic-ui-react';

class AvatarImageModal extends Component {
  render() {
    const {
      imageData,
      closeModal,
      uploadAvatarImage,
    } = this.props
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          ユーザーアイコン画像確認
        </Modal.Header>
        <Modal.Content style={{ margin: '10px 0' }}>
          <div style={{textAlign: 'center'}}>
            <img src={imageData} width="300" />
          </div>
        </Modal.Content>
        <Modal.Actions>
          <div className='center'>
            <Button color='grey' onClick={closeModal}><Icon name='remove'/>キャンセル</Button>
            <Button positive onClick={() => {uploadAvatarImage(imageData)}}><Icon name='checkmark'/>更新</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
}
;

export default AvatarImageModal;
