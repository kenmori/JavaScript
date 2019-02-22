import React from "react";
import { Tab, Card, Image, Button } from "semantic-ui-react";
import slack from "../../../images/logos/slack.png";

function handleIntegrationClick() {
  location.href = process.env.ADD_TO_SLACK_URL;
}

const AppSettingTab = React.memo(({ slackEnabled, onSegregate }) => (
  <Tab.Pane className="app-settings-tab">
    <Card className="app-settings-tab__card">
      <Image src={slack} className="app-settings-tab__card__logo" />
      <Card.Content>
        <Card.Description>
          <p>Slackと連携すると、Resilyの更新をSlack上で受け取る事が出来ます。</p>
          <p><a href="https://resily.slack.com/apps/AGADQ1QSX-resily" target="_blank">詳細はこちら</a></p>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          {slackEnabled ? (
            <Button basic color="red" onClick={onSegregate}>
              連携を解除
            </Button>
          ) : (
            <Button basic color="green" onClick={handleIntegrationClick}>
              Slack連携
            </Button>
          )}
        </div>
      </Card.Content>
    </Card>
  </Tab.Pane>
));

export default AppSettingTab;
