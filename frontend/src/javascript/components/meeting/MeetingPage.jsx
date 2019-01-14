import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import DocumentTitle from "react-document-title";
import { Header, Grid, Label, Icon } from "semantic-ui-react";
import meetingBoardCommentLabels from "../../constants/meetingBoardCommentLabels";
import CommentModal from "../../containers/CommentModal";
import ObjectiveCommentModal from "../../containers/ObjectiveCommentModal";
import DefaultLayout from "../templates/DefaultLayout";
import LabelItem from "./LabelItem";
import AnnouncementItem from "./AnnouncementItem";
import OkrItem from "./OkrItem";

class MeetingPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  selectKeyResultComments = (keyResults, objectiveId) => {
    const { showDisabledOkrs } = this.props;
    const comments = keyResults
      .filter(
        v =>
          objectiveId === v.get("objectiveId") &&
          v.get("comments") &&
          (showDisabledOkrs || !v.get("disabled")),
      )
      .map(v => v.get("comments").map(c => c.set("KeyResult", v)))
      .toList()
      .flatten(1);

    return comments
      .filter(v => v.get("showMeetingBoard") && v.get("label") != null)
      .sort((a, b) => {
        if (a.get("updatedAt") < b.get("updatedAt")) {
          return 1;
        }
        if (a.get("updatedAt") > b.get("updatedAt")) {
          return -1;
        }
        if (a.get("updatedAt") === b.get("updatedAt")) {
          return 0;
        }
      });
  };

  selectObjectiveComments = objective =>
    objective
      .get("comments")
      .filter(v => v.get("showMeetingBoard"))
      .sort((a, b) => {
        if (a.get("updatedAt") < b.get("updatedAt")) {
          return 1;
        }
        if (a.get("updatedAt") > b.get("updatedAt")) {
          return -1;
        }
        if (a.get("updatedAt") === b.get("updatedAt")) {
          return 0;
        }
      });

  selectLabelCommnets = (comments, label) =>
    comments.filter(v => v.get("label").get("name") === label);

  generateCommentLabelColumn = (comments, labels, labelName) => {
    const { updateKeyResult, openCommentModal, confirm } = this.props;
    const label = labels.get(labelName);

    return (
      <Grid.Column>
        <div className="meeting-board__content__header">
          <Label color={label.get("color")}>{label.get("name")}</Label>
          <div className="meeting-board__content__header__button">
            <a onClick={openCommentModal.bind(this, label)}>
              <Icon name="plus" />
              {`${labelName}を追加する`}
            </a>
          </div>
        </div>
        <LabelItem
          comments={this.selectLabelCommnets(comments, labelName)}
          updateKeyResult={updateKeyResult}
          confirm={confirm}
        />
      </Grid.Column>
    );
  };

  generateAnnouncementColumn = (objectiveId, announcements) => {
    const { updateObjective, openObjectiveCommentModal, confirm } = this.props;

    return (
      <Grid.Column>
        <div className="meeting-board__content__header">
          <Label color="green">アナウンスメント</Label>
          <div className="meeting-board__content__header__button">
            <a onClick={openObjectiveCommentModal.bind(this)}>
              <Icon name="plus" />
              アナウンスメントを追加する
            </a>
          </div>
        </div>
        <AnnouncementItem
          objectiveId={objectiveId}
          comments={announcements}
          updateObjective={updateObjective}
          confirm={confirm}
        />
      </Grid.Column>
    );
  };

  componentDidMount() {
    const {
      objectiveId,
      objectives,
      isFetchedKeyResultsCommentLabels,
      fetchKeyResultCommentLabels,
      fetchObjective,
    } = this.props;
    if (objectives.size < 1) {
      fetchObjective(objectiveId);
    }
    if (!isFetchedKeyResultsCommentLabels) {
      fetchKeyResultCommentLabels();
    }
  }

  render() {
    const {
      objectiveId,
      objectives,
      objective,
      keyResultCommentLabels,
      showDisabledOkrs,
      isFetchedKeyResultsCommentLabels,
    } = this.props;
    if (objectives.size < 1) {
      return null;
    }
    if (!isFetchedKeyResultsCommentLabels) {
      return null;
    }

    const keyResults = objective.get("keyResults");
    const comments = this.selectKeyResultComments(
      keyResults,
      objective.get("id"),
    );
    const objectiveComments = this.selectObjectiveComments(objective);

    const labels = new Map();
    keyResultCommentLabels.forEach(v => labels.set(v.get("name"), v));
    const title = `${objective.get("name")} -ミーティングボード-`;

    return (
      <DefaultLayout>
        <DocumentTitle title={title}>
          <div className="meeting-board">
            <Header
              as="h5"
              textAlign="left"
              block
              color="black"
              className="meeting-board__header">
              <div className="meeting-board__headerPane">
                <p className="meeting-board__headerPane__title">{title}</p>
              </div>
            </Header>
            <Grid celled columns={3} className="meeting-board__content">
              <Grid.Row>
                {this.generateCommentLabelColumn(
                  comments,
                  labels,
                  meetingBoardCommentLabels.THIS_WEEK_PRIORITY_TASK,
                )}
                <Grid.Column>
                  <Label
                    color="orange"
                    className="meeting-board__content__label">
                    OKRの見通し
                  </Label>
                  <OkrItem
                    objective={objective}
                    keyResults={keyResults}
                    showDisabledOkrs={showDisabledOkrs}
                  />
                </Grid.Column>
                {this.generateCommentLabelColumn(
                  comments,
                  labels,
                  meetingBoardCommentLabels.WIN_SESSION,
                )}
              </Grid.Row>
              <Grid.Row>
                {this.generateCommentLabelColumn(
                  comments,
                  labels,
                  meetingBoardCommentLabels.NEXT_4_WEEK,
                )}
                {this.generateAnnouncementColumn(
                  objective.get("id"),
                  objectiveComments,
                )}
                {this.generateCommentLabelColumn(
                  comments,
                  labels,
                  meetingBoardCommentLabels.ISSUE,
                )}
              </Grid.Row>
            </Grid>
            <CommentModal
              objective={objective}
              comments={this.selectKeyResultComments(
                keyResults,
                objective.get("id"),
              )}
              keyResultCommentLabels={keyResultCommentLabels}
            />
            <ObjectiveCommentModal
              objectiveId={objectiveId}
              objective={objective}
              comments={objectiveComments}
            />
          </div>
        </DocumentTitle>
      </DefaultLayout>
    );
  }
}

MeetingPage.propTypes = {
  objectiveId: PropTypes.number.isRequired,
  objective: ImmutablePropTypes.map.isRequired,
  objectives: ImmutablePropTypes.map.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired,
  isFetchedKeyResultsCommentLabels: PropTypes.bool.isRequired,
  showDisabledOkrs: PropTypes.bool.isRequired,
  fetchObjective: PropTypes.func.isRequired,
  fetchKeyResultCommentLabels: PropTypes.func.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  openCommentModal: PropTypes.func.isRequired,
  openObjectiveCommentModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default MeetingPage;