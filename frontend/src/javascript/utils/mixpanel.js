import mixpanel from "mixpanel-browser";

mixpanel.init(process.env.MIXPANEL_TOKEN);

function updateObjective(column) {
  mixpanel.track("Update Objective", {
    Column: column,
  });
}

function updateKeyResult(column) {
  mixpanel.track("Update Key Result", {
    Column: column,
  });
}

function changeTab(to, page) {
  mixpanel.track("Change Tab", {
    To: to,
    Page: page,
  });
}

export const track = {
  /**
   * コメント投稿イベント
   */
  postAnnouncement: () => mixpanel.track("Post Announcement"),
  postComment: (label = null) =>
    label
      ? mixpanel.track("Post Comment", { label })
      : mixpanel.track("Post Comment"),

  /**
   * モーダルオープンイベント
   */
  openOKRModal: () => mixpanel.track("Open OKR Modal"),
  openOptionModal: () => mixpanel.track("Open Option Modal"),

  /**
   * OKR作成イベント
   */
  createObjective: () => mixpanel.track("Create Objective"),
  createKeyResult: () => mixpanel.track("Create Key Result"),

  /**
   * OKR編集イベント
   */
  updateObjectiveProgressRate: () => updateObjective("Progress Rate"),
  updateObjectiveDescription: () => updateObjective("Description"),
  updateObjectiveResult: () => updateObjective("Result"),
  updateKeyResultTargetValue: () => updateKeyResult("Target Value"),
  updateKeyResultActualValue: () => updateKeyResult("Actual Value"),
  updateKeyResultProgressRate: () => updateKeyResult("Progress Rate"),
  updateKeyResultHealthy: () => updateKeyResult("Healthy"),
  updateKeyResultDescription: () => updateKeyResult("Description"),
  updateKeyResultResult: () => updateKeyResult("Result"),

  /**
   * タブ変更イベント
   */
  // Home
  changeTabToTaskFromHome: () => changeTab("Task", "Home"),
  changeTabToObjectiveFromHome: () => changeTab("Objective", "Home"),
  changeTabToKeyResultFromHome: () => changeTab("KeyResult", "Home"),

  // OKR Modal Objective
  changeTabToProgressFromOKRModalO: () =>
    changeTab("Progress", "OKR Modal Objective"),
  changeTabToInfoFromOKRModalO: () => changeTab("Info", "OKR Modal Objective"),
  changeTabToHistoryFromOKRModalO: () =>
    changeTab("History", "OKR Modal Objective"),

  // OKR Modal KeyResult
  changeTabToProgressFromOKRModalKR: () =>
    changeTab("Progress", "OKR Modal KeyResult"),
  changeTabToInfoFromOKRModalKR: () => changeTab("Info", "OKR Modal KeyResult"),
  changeTabToHistoryFromOKRModalKR: () =>
    changeTab("History", "OKR Modal KeyResult"),

  /**
   * タスククリックイベント
   */
  clickCreateSubKeyResultFromTask: () => mixpanel.track("Click Create Sub Key Result", {
    From: "Task",
  }),
  clickDoNotCreateFromTask: () => mixpanel.track("Click Do Not Create", {
    From: "Task",
  }),
};

export default mixpanel;
