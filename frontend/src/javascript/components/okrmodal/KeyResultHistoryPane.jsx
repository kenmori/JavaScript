import React from "react";
import { Form } from "semantic-ui-react";
import ChangeHistoryList from "../organisms/ChangeHistoryList";

class KeyResultHistoryPane extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { fetchKeyResultHistory, keyResult } = this.props;

    fetchKeyResultHistory(keyResult.get("id"));
  }

  render() {
    const { keyResult } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>変更履歴</label>
          <div>
            <ChangeHistoryList histories={keyResult.get("histories")} />
          </div>
        </Form.Field>
      </Form>
    );
  }
}

export default KeyResultHistoryPane;
