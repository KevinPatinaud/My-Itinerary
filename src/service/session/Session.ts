import AsyncStorage from "@react-native-async-storage/async-storage";
import { Trip } from "../../model/trip/Trip";

export const saveTrip = async (trip: Trip) => {
  const trips = await getTrips();

  if (trip.id === undefined) {
    trip.id = Date.now() + "";
    trips.push(trip);
  } else {
    for (let i = 0; i < trips.length; i++) {
      if (trips[i].id === trip.id) trips[i] = { ...trip };
    }
  }

  saveTrips(trips);
};

export const saveTrips = async (trips: Trip[]) => {
  try {
    await AsyncStorage.setItem("trips", JSON.stringify(trips));
  } catch (e) {}
};

export const deletTrip = async (tripId: String) => {
  const trips = await getTrips();
  const result = [] as Trip[];

  for (let i = 0; i < trips.length; i++) {
    if (trips[i].id !== tripId) result.push(trips[i]);
  }
  saveTrips(result);
  return result;
};

export const getTrips = async (): Promise<Trip[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem("trips");
    if (jsonValue === null) return [];

    const trips = JSON.parse(jsonValue) as Trip[];

    for (let i = 0; i < trips.length; i++) {
      trips[i].dateStart =
        trips[i].dateStart !== undefined
          ? new Date(trips[i].dateStart)
          : undefined;
      trips[i].dateEnd =
        trips[i].dateEnd !== undefined ? new Date(trips[i].dateEnd) : undefined;

      if (trips[i].tripDays !== undefined) {
        for (let j = 0; j < trips[i].tripDays.length; j++) {
          trips[i].tripDays[j].day =
            trips[i].tripDays[j].day !== undefined
              ? new Date(trips[i].tripDays[j].day)
              : undefined;
        }
      }
    }

    return trips;
  } catch (e) {
    return [];
  }
};
