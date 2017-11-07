import React, { Component } from 'react';
import { Button, Checkbox, CustomCalendar, Form, Icon, Input, Modal, Select, TextArea } from 'semantic-ui-react';

class AvatarImageModal extends Component {
  render() {
    return (
      <Modal open={this.props.isOpen}>
        <Modal.Header>
          タイトル
        </Modal.Header>
        <Modal.Content style={{ margin: '10px 0' }}>
          コンテンツ
        </Modal.Content>
        <Modal.Actions>
          <div className='center continue-check-box'>
            <Checkbox label={<label>このまま KeyResult の作成を続ける</label>} />
          </div>
          <div className='center'>
            <Button color='grey'><Icon name='remove'/>キャンセル</Button>
            <Button positive><Icon name='checkmark'/>保存</Button>
          </div>
        </ Modal.Actions >
      </ Modal >
    );
  }
}
;

export default AvatarImageModal;
