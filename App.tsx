import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaView, StyleSheet } from "react-native";
import ItineraryFormScreen from "./src/screen/ItineraryForm/ItineraryFormScreen";
import MenuScreen from "./src/screen/Menu/MenuScreen";
import TripDayFormScreen from "./src/screen/TripDayForm/TripDayFormScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Menu"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Menu" component={MenuScreen} />
          <Stack.Screen name="ItineraryForm" component={ItineraryFormScreen} />
          <Stack.Screen name="TripDayForm" component={TripDayFormScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
