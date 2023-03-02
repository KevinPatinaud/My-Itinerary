import { Activity } from "../activity/Activity";

export type ActivitySelected = {
  activity: Activity;
  startedHour: { hour: number; minutes: number };
  finishedHour: { hour: number; minutes: number };
};
