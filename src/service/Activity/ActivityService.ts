import { HarryPotterStudioAct } from "../../constant/activity/HarryPotterStudioAct";
import { Cities } from "../../constant/cities/Cities";
import { Activity } from "../../model/activity/Activity";

export const getActivities = () => {
  const activities = [] as Activity[];
  activities.push(HarryPotterStudioAct);
  return activities;
};

export const getActivitiesByCity = (city: Cities) => {
  return getActivities().filter((a) => a.city === city);
};
