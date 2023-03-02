import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  Dimensions,
  ScrollView,
} from "react-native";
import Constants from "expo-constants";
import ButtonRnd from "../../component/ButtonRnd/ButtonRnd";
import Title from "../../component/Title/Title";
import { Trip } from "../../model/trip/Trip";
import { getTrips } from "../../service/session/Session";
import { formatDate, getStrDateStartEnd } from "../../utils/DatesUtil";

const MenuScreen = ({ navigation }: any) => {
  const [trips, setTrips] = useState([] as Trip[]);

  React.useEffect(() => {
    const focusHandler = navigation.addListener("focus", () => {
      (async () => {
        setTrips(await getTrips());
      })();
    });
    return focusHandler;
  }, [navigation]);

  return (
    <View style={styles.mainView}>
      <Title text="Mes voyages" styleView={{ top: 10 }} />

      {trips
        .sort((t1, t2) => t1.dateStart.getTime() - t2.dateStart.getTime())
        .map((t: Trip, index) => (
          <ButtonRnd
            title={
              t.city +
              (t.dateStart !== undefined &&
              t.dateStart !== null &&
              t.dateEnd !== undefined &&
              t.dateEnd !== null
                ? " - " + getStrDateStartEnd(t.dateStart, t.dateEnd)
                : "")
            }
            position={{
              top: 50 + 60 * index,
              height: 50,
              left: 20,
              width: Dimensions.get("window").width - 40,
            }}
            onPress={() => {
              navigation.navigate("ItineraryForm", { trip: t });
            }}
          />
        ))}
      <ButtonRnd
        title="Ajouter mon prochain voyage"
        position={{
          top: Dimensions.get("window").height - 60,
          height: 50,
          left: 20,
          width: Dimensions.get("window").width - 40,
        }}
        onPress={() => {
          navigation.navigate("ItineraryForm");
        }}
      />
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
  scrollTrip: {
    height: 100,
    width: Dimensions.get("window").width,
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
});

export default MenuScreen;
