import React, { FC } from "react";
import {
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
} from "react-native";

export interface ButtonRndProps {
  position?: { top: number; left: number; width: number; height: number };
  title?: String;
  type?: "normal" | "alert";
  viewStyle?: ViewStyle;
  btnStyle?: ViewStyle;
  textStyle?: TextStyle;
  onPress?: (event: GestureResponderEvent) => void;
}

const ButtonRnd: FC<ButtonRndProps> = (props: ButtonRndProps) => {
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
        style={{
          ...styles.btn,
          ...props.btnStyle,
          width: props.position.width,
          height: props.position.height,
          backgroundColor:
            props.type && props.type === "alert" ? "#AAAAAA" : "#1574AD",
        }}
        onPress={props.onPress}
      >
        <Text style={{ ...styles.txt, ...props.textStyle }}>{props.title}</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    position: "absolute",
    padding: 10,
    borderColor: "#444444",
    borderRadius: 10,
    borderWidth: 1,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },

  txt: {
    color: "#ffffff",
    fontSize: 20,
  },
});

export default ButtonRnd;
