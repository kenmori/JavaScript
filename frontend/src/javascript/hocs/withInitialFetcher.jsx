import React, { Component } from "react";
import { connect } from "react-redux";
import Loading from "../containers/Loading";
import keyResultActions from "../actions/keyResults";
import currentActions from "../actions/current";

export default function withInitialFetcher(WrappedComponent) {
  const HOC = class extends Component {
    componentDidMount() {
      const {
        isFetchedMyDetail,
        fetchMyDetail,
        isFetchedKeyResultsCommentLabels,
        fetchKeyResultCommentLabels,
      } = this.props;
      if (!isFetchedMyDetail) {
        fetchMyDetail();
      }
      if (!isFetchedKeyResultsCommentLabels) {
        fetchKeyResultCommentLabels();
      }
    }

    render() {
      const {
        isFetchedMyDetail,
        isFetchedKeyResultsCommentLabels,
      } = this.props;
      if (!isFetchedMyDetail || !isFetchedKeyResultsCommentLabels) {
        return <Loading />;
      }

      return <WrappedComponent {...this.props} />;
    }
  };

  return connect(
    state => ({
      isFetchedMyDetail: state.current.get("isFetchedMyDetail"),
      isFetchedKeyResultsCommentLabels: state.keyResults.get(
        "isFetchedKeyResultsCommentLabels",
      ),
    }),
    dispatch => ({
      fetchMyDetail: () => {
        dispatch(currentActions.fetchMyDetail());
      },
      fetchKeyResultCommentLabels: () => {
        dispatch(keyResultActions.fetchKeyResultCommentLabels());
      },
    }),
  )(HOC);
}
