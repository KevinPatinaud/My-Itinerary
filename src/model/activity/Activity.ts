import { Cities } from "../../constant/cities/Cities";

export type Activity = {
  id: String;
  title: String;
  durationInHour: number;
  priceEuro: number;
  description: String;
  city: Cities;
};
