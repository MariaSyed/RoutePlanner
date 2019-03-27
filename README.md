# RoutePlanner

Route planner app utilizing Kyyti route search api: https://docs.kyyti.com/trip_search.html#routes-search
It fetches your current location and shows you possible routes to reach Kyyti Group office in Helsinki via public transport.

## How to install

1. `npm install` or `yarn install`

### Run on iOS Simulator

Note: Metro bundler does not behave as it should when started with `react-native`, hence steps 2 and 3 are necessary.

1. Run `react-native run-ios`
2. Close the metro bunder that starts and run `npm start` in project root
3. Reload the app to load files from bundler that you have started
4. The default iOS simulator's location is outside Finland. To change this:
   1. Open simulator
   2. Go to Debug > Location > Custom Location
   3. Enter coordinates of a Finnish metropolitan area, for eg. 60,203322 (lat) and 24,656253 (long)
   4. Reload App
  
### Run on Android Device/Emulator

Note: Metro bundler does not behave as it should when started with `react-native`, hence steps 3 and 4 are necessary.

1. Connect a physical android device or have an android emulator ready
2. Run `react-native run-android`
3. Close the metro bunder that starts and run `npm start` in project root
4. Reload the app to load files from bundler that you have started

## Project Structure

Project files are in `src` directory and are split by functionality. It has the following directories:

1. _components_ : This contains all screen elements. All components related to a screen are contained in its own directory.
2. _constants_ : This contains all values that will not change. The Kyyti Group location is stored here.
3. _services_ : This contains services for eg. Api
4. _types_ : All shared custom types used in this project
5. _utils_ : Helper functions and utility functions

## Thoughts on Further Improvement

1. _UX Improvement:_ When location fetching results in an error, there could be a refetch button. For now, user has to reload app.
2. _UX Improvement_: Better handling when user denies location permission. For now, it fills in default location.
3. _UX/DX Improvement_: Add react-navigation or react-native-navigation for better flow of screens. For now, it is done within one component to not complicate it further.

3. _DX Improvement_: Find root cause for metro bundler not working as it should. This issue was present with an empty react native project as well.
4. _DX Improvement_: Store base url as an environment variable
5. _DX Improvment_: Use React Hooks
6. _DX Improvement_: Tests

