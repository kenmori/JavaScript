import moment from "moment";

const REFERENCE = moment("2015-06-05");
const A_WEEK_OLD = REFERENCE.clone()
  .subtract(7, "days")
  .startOf("day");

export function isWithinAWeek(date) {
  return date.isAfter(A_WEEK_OLD);
}
