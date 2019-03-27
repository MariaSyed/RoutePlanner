import { PermissionsAndroid } from "react-native";

export const requestLocationPermissionAndroid = async () => {
  try {
    const granted = await PermissionsAndroid.requestMultiple(
      [PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
      ]
    );
    const fineLocationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );
    const coarseLocationGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION );

    if (fineLocationGranted && coarseLocationGranted) {
      return
    } else {
      throw new Error('Location permission on android was not granted')
    }
  } catch (err) {
    throw err
  }
};
