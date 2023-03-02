import { FC } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

export interface TitleProps {
  text: String;
  styleView?: ViewStyle;
  styleText?: TextStyle;
}

const Title: FC<TitleProps> = (props: TitleProps) => {
  return (
    <View style={{ ...styles.container, ...props.styleView }}>
      <Text style={{ ...styles.title, ...props.styleText }}>{props.text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
  title: {
    color: "#888888",
    fontSize: 24,
    alignItems: "center",
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default Title;
