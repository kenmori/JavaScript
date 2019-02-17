import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import ImmutablePropTypes from "react-immutable-proptypes";
import { Header, Grid, Label, Icon } from "semantic-ui-react";
import meetingBoardCommentLabels from "../../../constants/meetingBoardCommentLabels";
import CommentModal from "../../CommentModal";
import OKRModal from "../../organisms/OKRModal";
import ObjectiveCommentModal from "../../ObjectiveCommentModal";
import MeetingLayout from "../../../components/templates/MeetingLayout";
import LabelItem from "../../../components/meeting/LabelItem";
import AnnouncementItem from "../../../components/meeting/AnnouncementItem";
import OkrCard from "../../../containers//OkrCard";

const selectLabelCommnets = (comments, label) =>
  comments.filter(v => v.get("label").get("name") === label);

const GenerateCommentLabelColumn = ({
  updateKeyResult,
  openCommentModal,
  confirm,
  comments,
  label,
  labelName,
}) => (
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
      comments={selectLabelCommnets(comments, labelName)}
      updateKeyResult={updateKeyResult}
      confirm={confirm}
    />
  </Grid.Column>
);

const GenerateCommentLabelColumnParent = ({
  updateKeyResult,
  openCommentModal,
  confirm,
  labels,
  labelName,
  keyResultsComments,
}) => (
  <GenerateCommentLabelColumn
    comments={keyResultsComments}
    label={labels.get(labelName)}
    labelName={labelName}
    confirm={confirm}
    openCommentModal={openCommentModal}
    updateKeyResult={updateKeyResult}
  />
);

const GenerateAnnouncementColumn = ({
  objectiveId,
  announcements,
  updateObjective,
  openObjectiveCommentModal,
  confirm,
}) => {
  return (
    <Grid.Column>
      <div className="meeting-board__content__header">
        <Label color="green">アナウンスメント</Label>
        <div className="meeting-board__content__header__button">
          <a onClick={() => openObjectiveCommentModal()}>
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
class Meeting extends PureComponent {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { objectiveId, objectives, fetchObjective } = this.props;
    if (objectives.size < 1) {
      fetchObjective(objectiveId);
    }
  }
  render() {
    const {
      objectives,
      objective,
      objectiveId,
      objectiveComments,
      keyResults,
      keyResultId,
      keyResultsComments,
      keyResultCommentLabels,
      showDisabledOkrs,
      openOkrModal,
      isFetchedKeyResultsCommentLabels,
      updateKeyResult,
      openCommentModal,
      confirm,
      updateObjective,
      openObjectiveCommentModal,
    } = this.props;
    if (objectives.size < 1) {
      return null;
    }
    if (!isFetchedKeyResultsCommentLabels) {
      return null;
    }

    const labels = new Map();
    keyResultCommentLabels.forEach(v => labels.set(v.get("name"), v));

    return (
      <MeetingLayout title={`${objective.get("name")} - ミーティングボード`}>
        <div className="meeting-board">
          <Header
            as="h5"
            textAlign="left"
            block
            color="black"
            className="meeting-board__header">
            <div className="meeting-board__headerPane">
              <p className="meeting-board__headerPane__title">
                {objective.get("name")}
              </p>
            </div>
          </Header>
          <Grid celled columns={3} className="meeting-board__content">
            <Grid.Row>
              <GenerateCommentLabelColumnParent
                updateKeyResult={updateKeyResult}
                openCommentModal={openCommentModal}
                confirm={confirm}
                keyResultsComments={keyResultsComments}
                labels={labels}
                labelName={meetingBoardCommentLabels.THIS_WEEK_PRIORITY_TASK}
              />
              <Grid.Column>
                <Label color="orange" className="meeting-board__content__label">
                  OKRの見通し
                </Label>
                <OkrCard
                  objective={objective}
                  objectiveId={objectiveId}
                  keyResults={keyResults}
                  keyResultId={keyResultId}
                  showDisabledOkrs={showDisabledOkrs}
                  openOkrModal={openOkrModal}
                />
              </Grid.Column>
              <GenerateCommentLabelColumnParent
                updateKeyResult={updateKeyResult}
                openCommentModal={openCommentModal}
                confirm={confirm}
                keyResultsComments={keyResultsComments}
                labels={labels}
                labelName={meetingBoardCommentLabels.WIN_SESSION}
              />
            </Grid.Row>
            <Grid.Row>
              <GenerateCommentLabelColumnParent
                updateKeyResult={updateKeyResult}
                openCommentModal={openCommentModal}
                confirm={confirm}
                keyResultsComments={keyResultsComments}
                labels={labels}
                labelName={meetingBoardCommentLabels.NEXT_4_WEEK}
              />

              <GenerateAnnouncementColumn
                objectiveId={objective.get("id")}
                announcements={objectiveComments}
                updateObjective={updateObjective}
                openObjectiveCommentModal={openObjectiveCommentModal}
                confirm={confirm}
              />
              <GenerateCommentLabelColumnParent
                updateKeyResult={updateKeyResult}
                openCommentModal={openCommentModal}
                confirm={confirm}
                keyResultsComments={keyResultsComments}
                labels={labels}
                labelName={meetingBoardCommentLabels.ISSUE}
              />
            </Grid.Row>
          </Grid>
          <CommentModal
            objective={objective}
            comments={keyResultsComments}
            keyResultCommentLabels={keyResultCommentLabels}
          />
          <ObjectiveCommentModal
            title={objective.get("name")}
            objectiveId={objectiveId}
            comments={objectiveComments}
          />
        </div>
        <OKRModal />
      </MeetingLayout>
    );
  }
}

Meeting.propTypes = {
  objectiveId: PropTypes.number.isRequired,
  objective: ImmutablePropTypes.map.isRequired,
  objectives: ImmutablePropTypes.map.isRequired,
  keyResultCommentLabels: ImmutablePropTypes.list.isRequired,
  showDisabledOkrs: PropTypes.bool.isRequired,
  fetchObjective: PropTypes.func.isRequired,
  fetchKeyResultCommentLabels: PropTypes.func.isRequired,
  updateKeyResult: PropTypes.func.isRequired,
  updateObjective: PropTypes.func.isRequired,
  openCommentModal: PropTypes.func.isRequired,
  openObjectiveCommentModal: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
};

export default Meeting;
