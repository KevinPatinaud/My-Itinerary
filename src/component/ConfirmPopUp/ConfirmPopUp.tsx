import { useState } from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import ButtonRnd from "../ButtonRnd/ButtonRnd";

export interface ConfirmPopUpProps {
  description: String;
  onConfirm?: () => void;
  onDismiss?: () => void;
}

const ConfirmPopUp = (props: ConfirmPopUpProps) => {
  const [display, setDisplay] = useState(true);
  if (!display) return <></>;
  return (
    <>
      <View style={styles.transp}></View>
      <View style={styles.popup}>
        <Text style={styles.text}>{props.description}</Text>
        <ButtonRnd
          title="Confirmer"
          onPress={() => {
            props.onConfirm();
            setDisplay(false);
          }}
          position={{
            top: 70,
            left: 20,
            width: Dimensions.get("window").width - 120,
            height: 50,
          }}
        />
        <ButtonRnd
          title="Annuler"
          onPress={() => {
            props.onDismiss();
            setDisplay(false);
          }}
          position={{
            top: 140,
            left: 20,
            width: Dimensions.get("window").width - 120,
            height: 50,
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    top: 10,
    left: 20,
    width: Dimensions.get("window").width - 120,
    height: 50,
    fontSize: 18,
  },
  transp: {
    backgroundColor: "#888888",
    opacity: 0.7,
    position: "absolute",
    top: 0,
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  popup: {
    backgroundColor: "#FFFFFF",
    position: "absolute",
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    top: Dimensions.get("window").height / 4,
    height: 210,
    left: 40,
    width: Dimensions.get("window").width - 80,
  },
});

export default ConfirmPopUp;
