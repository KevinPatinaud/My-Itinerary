import { Cities } from "../../constant/cities/Cities";
import { TripDay } from "../tripDay/TripDay";

export type Trip = {
  id: String;
  city: Cities;
  dateStart: Date;
  dateEnd: Date;
  tripDays: TripDay[];
};
