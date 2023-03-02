import { View, StyleSheet, Dimensions, Button, Text } from "react-native";
import Title from "../../component/Title/Title";
import Constants from "expo-constants";
import React, { useState } from "react";
import SelectList from "../../component/SelectList/SelectList";
import { Cities } from "../../constant/cities/Cities";
import DateTimePicker, {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import ButtonRnd from "../../component/ButtonRnd/ButtonRnd";
import { Trip } from "../../model/trip/Trip";
import { deletTrip, saveTrip } from "../../service/session/Session";
import { formatDate } from "../../utils/DatesUtil";
import ConfirmPopUp from "../../component/ConfirmPopUp/ConfirmPopUp";
import TripDayList from "./component/TripDayList/TripDayList";
import { TripDay } from "../../model/tripDay/TripDay";

const ItineraryFormScreen = ({ route, navigation }: any) => {
  const [trip, setTrip] = useState(
    (route.params && route.params.trip ? route.params.trip : {}) as Trip
  );
  const [modification] = useState(route.params && route.params.trip);
  const [displayDeleteConf, setDisplayDeleteConf] = useState(false);

  const showDatePicker = (onChange, miniumDate: Date, cureentDate?: Date) => {
    DateTimePickerAndroid.open({
      value: cureentDate ? cureentDate : miniumDate ? miniumDate : new Date(),
      onChange,
      mode: "date",
      is24Hour: true,
      minimumDate: miniumDate,
    });
  };

  var citiesArr = [] as String[];
  for (var key in Cities) {
    citiesArr.push(Cities[key]);
  }

  const updateTripDays = (dateStart: Date, dateEnd: Date) => {
    const nmbTripDays =
      dateEnd && dateStart
        ? Math.ceil(
            (dateEnd.getTime() - dateStart.getTime()) / (24 * 3600 * 1000)
          )
        : 0;

    const tripDays = [] as TripDay[];

    for (let i = 0; i < nmbTripDays; i++) {
      const tripDay = {} as TripDay;
      tripDay.day = new Date(trip.dateStart.getTime() + i * 24 * 3600 * 1000);
      tripDays.push(tripDay);
    }

    if (dateEnd) tripDays.push({ day: dateEnd } as TripDay);

    setTrip({
      ...trip,
      dateStart: dateStart,
      dateEnd: dateEnd,
      tripDays: [...tripDays],
    });
  };

  return (
    <View style={styles.mainView}>
      <Title text="Mon prochain voyage" styleView={{ top: 10 }} />

      <ButtonRnd
        onPress={() => {
          showDatePicker(
            (event: DateTimePickerEvent, selectedDate) => {
              if (event.type !== "dismissed") {
                updateTripDays(selectedDate, trip.dateEnd);
              }
            },
            new Date(),
            trip.dateStart
          );
        }}
        title={trip.dateStart ? formatDate(trip.dateStart) : "Du"}
        position={{
          top: 110,
          left: 20,
          width: Dimensions.get("window").width / 2 - 25,
          height: 50,
        }}
      />

      <ButtonRnd
        onPress={() => {
          showDatePicker(
            (event: DateTimePickerEvent, selectedDate) => {
              if (event.type !== "dismissed") {
                updateTripDays(trip.dateStart, selectedDate);
              }
            },
            trip.dateStart ? trip.dateStart : new Date(),
            trip.dateEnd
          );
        }}
        title={trip.dateEnd ? formatDate(trip.dateEnd) : "Au"}
        position={{
          top: 110,
          left: Dimensions.get("window").width / 2 + 5,
          width: Dimensions.get("window").width / 2 - 25,
          height: 50,
        }}
      />
      <SelectList
        position={{
          top: 50,
          left: 20,
          width: Dimensions.get("window").width - 40,
          height: 50,
        }}
        placeHolder={trip.city ? trip.city : "Destination"}
        elements={citiesArr}
        onSelect={(element: any) => {
          setTrip({ ...trip, city: element });
        }}
        displayElement={(element: any) => {
          return "";
        }}
      />

      {trip.tripDays && (
        <TripDayList
          tripDays={trip.tripDays}
          viewStyle={styles.tripDayListView}
          onUpdate={(tripDays: TripDay[]) => {
            setTrip({
              ...trip,
              tripDays: [...tripDays],
            });
          }}
        />
      )}

      {modification && (
        <ButtonRnd
          type="alert"
          onPress={async () => {
            setDisplayDeleteConf(true);
          }}
          title={"Supprimer le voyage"}
          position={{
            top: Dimensions.get("window").height - 120,
            left: 20,
            width: Dimensions.get("window").width - 40,
            height: 50,
          }}
        />
      )}

      <ButtonRnd
        onPress={async () => {
          await saveTrip(trip);
          navigation.navigate("Menu");
        }}
        title={"Sauvegarder"}
        position={{
          top: Dimensions.get("window").height - 60,
          left: 20,
          width: Dimensions.get("window").width - 40,
          height: 50,
        }}
      />

      {displayDeleteConf && (
        <ConfirmPopUp
          description="Etes vous sûr de vouloir supprimer ce voyage ?"
          onConfirm={async () => {
            await deletTrip(trip.id);
            setDisplayDeleteConf(false);
            navigation.navigate("Menu");
          }}
          onDismiss={() => {
            setDisplayDeleteConf(false);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  tripDayListView: {
    position: "absolute",
    top: 170,
    left: 20,
    width: Dimensions.get("window").width - 40,
    height: Dimensions.get("window").height - 170 - 130,
  },
});

export default ItineraryFormScreen;
