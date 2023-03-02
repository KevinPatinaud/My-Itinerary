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
import { ActivitySelected } from "../../../../model/activitySelected/ActivitySelected";
import { TripDay } from "../../../../model/tripDay/TripDay";
import { formatDate } from "../../../../utils/DatesUtil";
import TripDayDetail from "../TripDayDetail/TripDayDetail";

export interface TripDayListProps {
  tripDays: TripDay[];
  viewStyle: StyleProp<ViewStyle>;
  onUpdate: (tripDays: TripDay[]) => void;
}

const TripDayList = (props: TripDayListProps) => {
  const [daySelected, setDaySelected] = useState(null as number);

  if (daySelected === null)
    return (
      <ScrollView style={props.viewStyle}>
        {props.tripDays &&
          props.tripDays.map((td, index) => (
            <TouchableHighlight
              onPress={() => {
                setDaySelected(index);
              }}
            >
              <View style={styles.dayView}>
                <Text style={styles.dayTitle}>
                  {"Jour " + (index + 1) + " : " + formatDate(td.day)}
                </Text>
                {td.activitiesSelected ? (
                  td.activitiesSelected.map((activity: ActivitySelected) => (
                    <Text style={styles.activtyDesc}>
                      {activity.startedHour.hour +
                        "h" +
                        activity.startedHour.minutes +
                        (activity.finishedHour
                          ? " - " +
                            activity.finishedHour.hour +
                            "h" +
                            activity.finishedHour.minutes
                          : "") +
                        " : " +
                        activity.activity.title}
                    </Text>
                  ))
                ) : (
                  <Text style={styles.clickToModifyText}>
                    {"(Cliquez ici pour ajouter une activité)"}
                  </Text>
                )}
              </View>
            </TouchableHighlight>
          ))}
      </ScrollView>
    );
  else
    return (
      <TripDayDetail
        viewStyle={props.viewStyle}
        tripDay={props.tripDays[daySelected]}
        onClose={() => {
          setDaySelected(null);
        }}
        onUpdate={() => {}}
        indexDay={daySelected}
      />
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

export default TripDayList;
