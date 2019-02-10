import React from "react";
import { Modal } from "semantic-ui-react";
import DocumentTitle from "react-document-title";

export default React.memo(({ title, size, isOpen, handleClose, children }) => (
  <DocumentTitle title={`${title} - Resily`}>
    <Modal
      closeIcon
      open={isOpen}
      size={size}
      className="modal"
      onClose={handleClose}>
      {children}
    </Modal>
  </DocumentTitle>
));
