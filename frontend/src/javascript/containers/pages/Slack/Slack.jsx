import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Message } from "semantic-ui-react";
import DefaultLayout from "../../../components/layouts/DefaultLayout";

class Slack extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { code, integrateSlack, history } = this.props;

    if (!code) {
      history.push("/settings/applications");
      return;
    }
    integrateSlack(code);
  }

  render() {
    return (
      <DefaultLayout title="Slack連携">
        <Message>
          <Message.Content>
            <Message.Header>Slack連携設定中...</Message.Header>
          </Message.Content>
        </Message>
      </DefaultLayout>
    );
  }
}

Slack.propTypes = {
  code: PropTypes.string.isRequired,
  integrateSlack: PropTypes.func.isRequired,
};

export default Slack;
