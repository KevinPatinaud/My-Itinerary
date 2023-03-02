import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import {
  TextStyle,
  TouchableHighlight,
  View,
  ViewStyle,
  StyleSheet,
  Text,
  GestureResponderEvent,
} from "react-native";

export interface SelectListProps {
  placeHolder: String;
  elements: String[];
  onSelect: (element: any) => void;
  displayElement: (element: any) => String;
  position?: { top: number; left: number; width: number; height: number };
  viewStyle?: ViewStyle;
  selectStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const SelectList = (props: SelectListProps) => {
  const [display, setDisplay] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(props.placeHolder);

  return (
    <View
      style={
        props.position
          ? {
              ...props.viewStyle,
              position: "absolute",
              left: props.position.left,
              top: props.position.top,
              width: props.position.width,
              height: props.position.height,
            }
          : { ...props.viewStyle }
      }
    >
      <TouchableHighlight
        style={
          props.position
            ? {
                ...styles.btn,
                ...props.selectStyle,
                width: props.position.width,
                height: props.position.height,
              }
            : {
                ...styles.btn,
                ...props.selectStyle,
              }
        }
        onPress={(event: GestureResponderEvent) => {
          setDisplay(!display);
        }}
      >
        <View style={styles.btnContainer}>
          <Text style={{ ...styles.btnText, ...props.textStyle }}>
            {placeHolder}
          </Text>
          <AntDesign
            style={styles.icon}
            name={display ? "upcircle" : "downcircle"}
            size={20}
            color="#ffffff"
          />
        </View>
      </TouchableHighlight>
      {display && (
        <View style={{ ...styles.selectList, top: props.position.height }}>
          {props.elements.map((e: String) => (
            <TouchableHighlight
              style={styles.selectableItem}
              onPress={(event: GestureResponderEvent) => {
                setPlaceHolder(e);
                props.onSelect(e);
                setDisplay(false);
              }}
            >
              <Text style={styles.textItem}>{e}</Text>
            </TouchableHighlight>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    backgroundColor: "#1574AD",
    padding: 10,
    borderColor: "#444444",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },

  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 20,
  },
  btnText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
    fontSize: 20,
  },
  selectList: {
    zIndex: 999,
    backgroundColor: "#DDDDDD",
    padding: 10,
    borderRadius: 10,
    borderColor: "#444444",
    borderWidth: 1,
  },
  selectableItem: {
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
    padding: 5,
  },
  textItem: {
    fontSize: 18,
    color: "#1574AD",
  },
});

export default SelectList;
