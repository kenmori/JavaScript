import React from "react";
import { Form } from "semantic-ui-react";
import ChangeHistoryList from "../organisms/ChangeHistoryList";

class ObjectiveHistoryPane extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchObjectiveHistory, objective } = this.props;

    fetchObjectiveHistory(objective.get("id"));
  }

  render() {
    const { objective } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>変更履歴</label>
          <div>
            <ChangeHistoryList histories={objective.get("histories")} />
          </div>
        </Form.Field>
      </Form>
    );
  }
}

export default ObjectiveHistoryPane;
