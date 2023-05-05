import {Moment} from "moment";
import _ from "lodash";

// Moment => Timestamp
function convertTime(date?: Moment, isEndDate?: boolean): number {
  if (!date) return 0;
  if (isEndDate) {
    return date.set({hour: 23, minute: 59, second: 59}).unix();
  }
  return date.set({hour: 0, minute: 0, second: 0}).unix();
}

export {convertTime};
