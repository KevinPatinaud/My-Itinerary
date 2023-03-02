import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import { HarryPotterStudioAct } from "../../../../constant/activity/HarryPotterStudioAct";
import { ActivitySelected } from "../../../../model/activitySelected/ActivitySelected";
import { TripDay } from "../../../../model/tripDay/TripDay";
import { formatDate } from "../../../../utils/DatesUtil";

export interface TripDayDetailProps {
  viewStyle: StyleProp<ViewStyle>;
  tripDay: TripDay;
  onUpdate: (tripDay: TripDay) => void;
  onClose: () => void;
  indexDay: number;
}

const TripDayDetail = (props: TripDayDetailProps) => {
  return (
    <ScrollView style={{ ...styles.dayView, ...(props.viewStyle as Object) }}>
      <>
        <TouchableHighlight
          style={styles.closeCross}
          onPress={() => {
            if (props.tripDay.activitiesSelected === undefined) {
              props.tripDay.activitiesSelected = [] as ActivitySelected[];
            }
            props.tripDay.activitiesSelected.push({
              activity: HarryPotterStudioAct,
              startedHour: { hour: 12, minutes: 15 },
              finishedHour: { hour: 14, minutes: 30 },
            } as ActivitySelected);
            props.onUpdate(props.tripDay);

            props.onClose();
          }}
        >
          <AntDesign name={"closecircle"} size={20} color="#AAAAAA" />
        </TouchableHighlight>
        <Text style={styles.dayTitle}>
          {"Jour " +
            (props.indexDay + 1) +
            " : " +
            formatDate(props.tripDay.day)}
        </Text>
        {props.tripDay.activitiesSelected &&
          props.tripDay.activitiesSelected.map(
            (act: ActivitySelected, index) => (
              <>
                <TouchableHighlight
                  style={styles.dropActivityBtn}
                  onPress={() => {
                    delete props.tripDay.activitiesSelected[index];
                    props.onUpdate(props.tripDays);
                  }}
                >
                  <AntDesign name={"closecircle"} size={20} color="#AAAAAA" />
                </TouchableHighlight>
                <Text style={styles.activtyDetail}>
                  <Text style={styles.selectableHour}>
                    {act.startedHour.hour + "H" + act.startedHour.minutes}
                  </Text>
                  {act.finishedHour && " - "}
                  <Text style={styles.selectableHour}>
                    {act.finishedHour
                      ? act.finishedHour.hour + "h" + act.finishedHour.minutes
                      : ""}
                  </Text>
                  {" : " + act.activity.title}
                </Text>
              </>
            )
          )}
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  selectableHour: { fontWeight: "bold" },
  dayTitle: {
    fontSize: 18,
    color: "#1574AD",
    fontWeight: "bold",
  },
  activtyDesc: {
    fontSize: 16,
    color: "#1574AD",
  },
  activtyDetail: {
    fontSize: 16,
    color: "#1574AD",
    marginTop: 10,
  },
  clickToModifyText: {
    marginTop: 10,
    fontSize: 14,
    color: "#888888",
  },
  dayView: {
    alignSelf: "stretch",
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 1,
    padding: 10,
  },
  dropActivityBtn: {
    //   position: "absolute",
    right: 0,
    zIndex: 999,
  },
  closeCross: {
    position: "absolute",
    right: 0,
    zIndex: 999,
  },
});

export default TripDayDetail;
