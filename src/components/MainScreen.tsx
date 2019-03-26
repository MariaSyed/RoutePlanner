import React from "react";
import { Component } from "react";
import { View, TouchableOpacity, Text, AsyncStorage } from "react-native";
import { requestLocationPermissionAndroid } from "../utils/AndroidPermissions";
import API from "../services/Api";
import RouteSearchForm from "../components/RouteSearchForm";
import { RouteSearchRequest, RouteSearchResponse } from "../types/RouteSearch";
import RouteSearchResults from "../components/RouteSearchResults";
import { KYYTI_GROUP_LOCATION } from "../constants/Locations";
import { LoadingState } from "../types/LoadingState";

interface Props {}

interface State {
  lat: number;
  lon: number;
  error?: string;
  routeResults?: RouteSearchResponse;
  fetching: LoadingState;
}
export default class MainScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lat: 60.2033217,
      lon: 24.6562533,
      error: undefined,
      routeResults: undefined,
      fetching: LoadingState.UNKNOWN
    };
  }

  componentDidMount() {
    // if (Platform.OS === 'android') requestLocationPermissionAndroid()
    // navigator.geolocation.requestAuthorization()
    // this.updateCurrentLocation()
    AsyncStorage.getItem("RESULTS").then(resultsStr => {
      if (resultsStr) {
        this.setState({ routeResults: JSON.parse(resultsStr) });
      }
    });
  }

  updateCurrentLocation = () => {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       lat: position.coords.latitude,
    //       lon: position.coords.longitude,
    //       error: undefined,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
  };

  searchRoute = async () => {
    const { lat, lon } = this.state;
    this.setState({ fetching: LoadingState.LOADING });

    const query: RouteSearchRequest = {
      start: {
        location: {
          lat,
          lon
        }
      },
      end: KYYTI_GROUP_LOCATION,
      routeModes: "publicTransport"
    };

    try {
      const routeResults = await API.postRouteSearch(query);
      AsyncStorage.setItem("RESULTS", JSON.stringify(routeResults));
      this.setState({ routeResults, fetching: LoadingState.LOADED });
    } catch (e) {
      // TODO: Handle error
      console.error(e);
      this.setState({ fetching: LoadingState.ERROR });
    }
  };

  render() {
    const { lat, lon, routeResults, fetching } = this.state;
    return (
      <View>
        {!routeResults ? (
          <RouteSearchForm
            currentCoordinates={{ lat, lon }}
            onSearchRoute={this.searchRoute}
            fetching={fetching}
          />
        ) : (
          <View>
            <RouteSearchResults routeResults={routeResults} />
            <TouchableOpacity
              onPress={() => this.setState({ routeResults: undefined })}
            >
              <Text>Clear search</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
