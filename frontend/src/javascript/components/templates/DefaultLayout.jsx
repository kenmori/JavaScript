import React from "react";
import Loading from "../../containers/Loading";
import Toast from "../../containers/Toast";
import ErrorModal from "../../containers/ErrorModal";
import ConfirmModal from "../../containers/ConfirmModal";

export default React.memo(({ children }) => (
  <React.Fragment>
    {children}
    <Loading />
    <Toast />
    <ErrorModal />
    <ConfirmModal />
  </React.Fragment>
));
