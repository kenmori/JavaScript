const actionTypes = {
  FETCH_MY_DETAIL: "FETCH_MY_DETAIL",
  FETCHED_MY_DETAIL: "FETCHED_MY_DETAIL",
  SET_CURRENT: "SET_CURRENT",
  SET_CURRENT_LOGIN_USER: "SET_CURRENT_LOGIN_USER",
  SET_CURRENT_ORGANIZATION: "SET_CURRENT_ORGANIZATION",
  FETCH_OKRS: "FETCH_OKRS",
  ADD_OBJECTIVE: "ADD_OBJECTIVE",
  ADDED_OBJECTIVE: "ADDED_OBJECTIVE",
  FETCH_OBJECTIVE: "FETCH_OBJECTIVE",
  FETCH_OBJECTIVE_ASYNC: "FETCH_OBJECTIVE_ASYNC",
  FETCHED_OBJECTIVE: "FETCHED_OBJECTIVE",
  FETCHED_OBJECTIVE_ERROR: "FETCHED_OBJECTIVE_ERROR",
  FETCH_OBJECTIVES: "FETCH_OBJECTIVES",
  FETCHED_OBJECTIVES: "FETCHED_OBJECTIVES",
  FETCH_PREVIOUS_OBJECTIVES: "FETCH_PREVIOUS_OBJECTIVES",
  FETCHED_PREVIOUS_OBJECTIVES: "FETCHED_PREVIOUS_OBJECTIVES",
  FETCHED_PREVIOUS_OBJECTIVES_ERROR: "FETCHED_PREVIOUS_OBJECTIVES_ERROR",
  FETCH_OBJECTIVE_CANDIDATES: "FETCH_OBJECTIVE_CANDIDATES",
  FETCHED_OBJECTIVE_CANDIDATES: "FETCHED_OBJECTIVE_CANDIDATES",
  UPDATE_OBJECTIVE: "UPDATE_OBJECTIVE",
  UPDATED_OBJECTIVE: "UPDATED_OBJECTIVE",
  REMOVE_OBJECTIVE: "REMOVE_OBJECTIVE",
  REMOVED_OBJECTIVE: "REMOVED_OBJECTIVE",
  REMOVED_OBJECTIVE_KEY_RESULTS: "REMOVED_OBJECTIVE_KEY_RESULTS",
  DISABLE_OBJECTIVE: "DISABLE_OBJECTIVE",
  DISABLED_OBJECTIVE: "DISABLED_OBJECTIVE",
  FETCH_KEY_RESULTS: "FETCH_KEY_RESULTS",
  FETCHED_KEY_RESULTS: "FETCHED_KEY_RESULTS",
  FETCH_KEY_RESULT_CANDIDATES: "FETCH_KEY_RESULT_CANDIDATES",
  FETCHED_KEY_RESULT_CANDIDATES: "FETCHED_KEY_RESULT_CANDIDATES",
  FETCH_TASK_KEY_RESULTS: "FETCH_TASK_KEY_RESULTS",
  FETCHED_TASK_KEY_RESULTS: "FETCHED_TASK_KEY_RESULTS",
  FETCH_KEY_RESULT_COMMENT_LABELS: "FETCH_KEY_RESULT_COMMENT_LABELS",
  FETCHED_KEY_RESULT_COMMENT_LABELS: "FETCHED_KEY_RESULT_COMMENT_LABELS",
  ADD_KEY_RESULT: "ADD_KEY_RESULT",
  ADDED_KEY_RESULT: "ADDED_KEY_RESULT",
  UPDATE_KEY_RESULT: "UPDATE_KEY_RESULT",
  UPDATED_KEY_RESULT: "UPDATED_KEY_RESULT",
  REMOVE_KEY_RESULT: "REMOVE_KEY_RESULT",
  REMOVED_KEY_RESULT: "REMOVED_KEY_RESULT",
  REMOVED_KEY_RESULT_MEMBER: "REMOVED_KEY_RESULT_MEMBER",
  DISABLE_KEY_RESULT: "DISABLE_KEY_RESULT",
  DISABLED_KEY_RESULT: "DISABLED_KEY_RESULT",
  PROCESS_KEY_RESULT: "PROCESS_KEY_RESULT",
  PROCESSED_KEY_RESULT: "PROCESSED_KEY_RESULT",
  OPEN_KEY_RESULT_MODAL: "OPEN_KEY_RESULT_MODAL",
  CLOSE_KEY_RESULT_MODAL: "CLOSE_KEY_RESULT_MODAL",
  OPEN_OBJECTIVE_MODAL: "OPEN_OBJECTIVE_MODAL",
  CLOSE_OBJECTIVE_MODAL: "CLOSE_OBJECTIVE_MODAL",
  OPEN_OKR_MODAL: "OPEN_OKR_MODAL",
  OPENED_OKR_MODAL: "OPENED_OKR_MODAL",
  CLOSE_OKR_MODAL: "CLOSE_OKR_MODAL",
  OPEN_IMAGE_MODAL: "OPEN_IMAGE_MODAL",
  CLOSE_IMAGE_MODAL: "CLOSE_IMAGE_MODAL",
  OPEN_ERROR_MODAL: "OPEN_ERROR_MODAL",
  CLOSE_ERROR_MODAL: "CLOSE_ERROR_MODAL",
  OPEN_COMMENT_MODAL: "OPEN_COMMENT_MODAL",
  OPEN_OBJECTIVE_COMMENT_MODAL: "OPEN_OBJECTIVE_COMMENT_MODAL",
  CLOSE_COMMENT_MODAL: "CLOSE_COMMENT_MODAL",
  CLOSE_OBJECTIVE_COMMENT_MODAL: "CLOSE_OBJECTIVE_COMMENT_MODAL",
  ADD_USER: "ADD_USER",
  ADDED_USER: "ADDED_USER",
  UPDATE_USER: "UPDATE_USER",
  UPDATED_USER: "UPDATED_USER",
  DISABLE_USER: "DISABLE_USER",
  DISABLED_USER: "DISABLED_USER",
  UPDATE_PASSWORD: "UPDATE_PASSWORD",
  RESEND_EMAIL: "RESEND_EMAIL",
  UPDATE_OBJECTIVE_ORDER: "UPDATE_OBJECTIVE_ORDER",
  UPDATED_OBJECTIVE_ORDER: "UPDATED_OBJECTIVE_ORDER",
  UPDATE_USER_SETTING: "UPDATE_USER_SETTING",
  UPDATED_USER_SETTING: "UPDATED_USER_SETTING",
  FETCH_ORGANIZATION: "FETCH_ORGANIZATION",
  FETCHED_ORGANIZATION: "FETCHED_ORGANIZATION",
  ADD_ORGANIZATION: "ADD_ORGANIZATION",
  ADDED_ORGANIZATION: "ADDED_ORGANIZATION",
  UPDATE_ORGANIZATION: "UPDATE_ORGANIZATION",
  UPDATED_ORGANIZATION: "UPDATED_ORGANIZATION",
  UPDATE_ORGANIZATION_OWNER: "UPDATE_ORGANIZATION_OWNER",
  UPDATED_ORGANIZATION_OWNER: "UPDATED_ORGANIZATION_OWNER",
  RESET_PASSWORD: "RESET_PASSWORD",
  RESET_PASSWORD_COMPLETED: "RESET_PASSWORD_COMPLETED",
  SET_PASSWORD: "SET_PASSWORD",
  SIGN_IN: "SIGN_IN",
  SIGN_OUT: "SIGN_OUT",
  OPEN_LOADING: "OPEN_LOADING",
  CLOSE_LOADING: "CLOSE_LOADING",
  FORCE_CLOSE_LOADING_ON: "FORCE_CLOSE_LOADING_ON",
  FORCE_CLOSE_LOADING_OFF: "FORCE_CLOSE_LOADING_OFF",
  OPEN_CONFIRM_MODAL: "OPEN_CONFIRM_MODAL",
  CLOSE_CONFIRM_MODAL: "CLOSE_CONFIRM_MODAL",
  OPEN_OPTION_MODAL: "OPEN_OPTION_MODAL",
  CLOSE_OPTION_MODAL: "CLOSE_OPTION_MODAL",
  ADD_OKR_PERIOD: "ADD_OKR_PERIOD",
  ADDED_OKR_PERIOD: "ADDED_OKR_PERIOD",
  UPDATE_OKR_PERIOD: "UPDATE_OKR_PERIOD",
  UPDATED_OKR_PERIOD: "UPDATED_OKR_PERIOD",
  REMOVE_OKR_PERIOD: "REMOVE_OKR_PERIOD",
  REMOVED_OKR_PERIOD: "REMOVED_OKR_PERIOD",
  SELECT_OKR_PERIOD: "SELECT_OKR_PERIOD",
  SELECT_OKR_PERIOD_BY_OKR: "SELECT_OKR_PERIOD_BY_OKR",
  SELECTED_OKR_PERIOD: "SELECTED_OKR_PERIOD",
  SELECT_USER: "SELECT_USER",
  SELECTED_USER: "SELECTED_USER",
  SELECT_TAB: "SELECT_TAB",
  HIGHLIGHT_OKR: "HIGHLIGHT_OKR",
  UNHIGHLIGHT_OKR: "UNHIGHLIGHT_OKR",
  SELECT_OKR: "SELECT_OKR",
  CLEAR_SELECTED_OKR: "CLEAR_SELECTED_OKR",
  SELECT_MAP_OKR: "SELECT_MAP_OKR",
  SELECTED_MAP_OKR: "SELECTED_MAP_OKR",
  CLEAR_MAP_OKR: "CLEAR_MAP_OKR",
  EXPAND_OBJECTIVE: "EXPAND_OBJECTIVE",
  EXPANDED_OBJECTIVE: "EXPANDED_OBJECTIVE",
  COLLAPSE_OBJECTIVE: "COLLAPSE_OBJECTIVE",
  EXPAND_KEY_RESULT: "EXPAND_KEY_RESULT",
  EXPANDED_KEY_RESULT: "EXPANDED_KEY_RESULT",
  COLLAPSE_KEY_RESULT: "COLLAPSE_KEY_RESULT",
  SCROLL_TO_OBJECTIVE: "SCROLL_TO_OBJECTIVE",
  SHOW_TOAST: "SHOW_TOAST",
  CLEAR_TOAST: "CLEAR_TOAST",
};
export default actionTypes;