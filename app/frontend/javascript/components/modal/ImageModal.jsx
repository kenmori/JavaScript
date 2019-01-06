import React, { PureComponent } from "react";
import { Button, Modal, Image, Loader } from "semantic-ui-react";
import PropTypes from "prop-types";

class ImageModal extends PureComponent {
  constructor() {
    super();
    this.state = { base64: null };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen && !nextProps.isOpen) {
      this.setState({ base64: null });
    } else if (nextProps.data) {
      const reader = new FileReader();
      reader.onload = data => this.setState({ base64: data.target.result });
      reader.readAsDataURL(nextProps.data);
    }
  }

  handleClick = () =>
    this.props.updateImage(this.props.id, this.props.data, this.props.isAvatar);

  render() {
    const { isOpen, closeModal } = this.props;
    const { base64 } = this.state;
    return (
      <Modal
        className="image-modal"
        closeIcon
        open={isOpen}
        size="mini"
        onClose={closeModal}>
        <Modal.Content>
          {base64 ? (
            <Image src={base64} size="medium" centered />
          ) : (
            <Loader className="image-modal__loader" active inline="centered" />
          )}
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={closeModal}>キャンセル</Button>
          <Button positive onClick={this.handleClick}>
            OK
          </Button>
        </Modal.Actions>
      </Modal>
    );
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
};

export default ImageModal;
