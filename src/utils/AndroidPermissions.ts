import { PermissionsAndroid } from "react-native";

export const requestLocationPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Kyyti Route Planner Location Permission",
        message:
          "Kyyti Route Planner needs access to your location " +
          "so you can find the best route to Kyyti HQ ",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the location");
    } else {
      console.log("Location permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};
