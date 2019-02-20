import React from "react";
import DocumentTitle from "react-document-title";
import Loading from "../../../containers/Loading";
import Toast from "../../../containers/Toast";
import ErrorModal from "../../../containers/ErrorModal";
import ConfirmModal from "../../../containers/ConfirmModal";

export default React.memo(({ title, children }) => (
  <DocumentTitle title={`${title} - Resily`}>
    <React.Fragment>
      {children}
      <Loading />
      <Toast />
      <ErrorModal />
      <ConfirmModal />
    </React.Fragment>
  </DocumentTitle>
));
