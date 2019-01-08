import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";
import moment from "moment/moment";
import ImmutablePropTypes from "react-immutable-proptypes";
import DatePicker from "../form/DatePicker";

class OkrPeriodAddForm extends PureComponent {
  constructor(props) {
    super(props);
    const startDate = this.calcStartDate(props.okrPeriods);
    const endDate = this.calcEndDate(startDate);
    this.state = { name: "", startDate, endDate };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.okrPeriods !== nextProps.okrPeriods) {
      const startDate = this.calcStartDate(nextProps.okrPeriods);
      const endDate = this.calcEndDate(startDate);
      this.setState({ startDate, endDate });
    }
  }

  calcStartDate(okrPeriods) {
    const endDate = okrPeriods
      .map(okrPeriod => okrPeriod.get("endDate"))
      .sort()
      .last();
    return moment(endDate).add(1, "day");
  }

  calcEndDate(startDate) {
    return startDate
      .clone()
      .add(this.props.okrSpan, "month")
      .subtract(1, "day");
  }

  handleNameChange = (e, { value }) => this.setState({ name: value });

  handleStartDateChange = startDate => {
    if (startDate) {
      this.setState({ startDate });
    }
  };

  handleEndDateChange = endDate => {
    if (endDate) {
      this.setState({ endDate });
    }
  };

  handleAddClick = () => {
    const { organizationId } = this.props;
    const { name, startDate, endDate } = this.state;
    this.props.addOkrPeriod({
      name,
      startDate: startDate.format("YYYY-MM-DD"),
      endDate: endDate.format("YYYY-MM-DD"),
      organizationId,
    });
    this.setState({ name: "" });
  };

  render() {
    const { name, startDate, endDate } = this.state;
    return (
      <Form className="okr-period-add-form">
        <Form.Input
          inline
          label="名前"
          value={name}
          maxLength="255"
          placeholder="期間を表す名称など"
          onChange={this.handleNameChange}
        />

        <Form.Group inline>
          <label>期間</label>
          <DatePicker
            dateFormat="YYYY/M/D"
            selected={startDate}
            locale="ja"
            onChange={this.handleStartDateChange}
          />
          <span className="between">〜</span>
          <DatePicker
            dateFormat="YYYY/M/D"
            selected={endDate}
            locale="ja"
            onChange={this.handleEndDateChange}
          />
        </Form.Group>

        <Form.Button
          icon="plus"
          content="追加する"
          onClick={this.handleAddClick}
        />
      </Form>
    );
  }
}

OkrPeriodAddForm.propTypes = {
  // container
  organizationId: PropTypes.number.isRequired,
  okrSpan: PropTypes.number.isRequired,
  okrPeriods: ImmutablePropTypes.list.isRequired,
  addOkrPeriod: PropTypes.func.isRequired,
  // component
};

export default OkrPeriodAddForm;
