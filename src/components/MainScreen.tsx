import React from "react";
import { Component } from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components/native";

import RouteSearchForm from "../components/RouteSearchForm";
import RouteSearchResults from "../components/RouteSearchResults/RouteSearchResults";

import { requestLocationPermissionAndroid } from "../utils/AndroidPermissions";
import API from "../services/Api";
import { KYYTI_GROUP_LOCATION, DEFAULT_COORDS } from "../constants/Locations";
import { LoadingState } from "../types/LoadingState";
import { RouteSearchRequest, RouteSearchResponse } from "../types/RouteSearch";

const MainContainer = styled.View`
  margin: 20px;
`;

const GoBackButton = styled.TouchableOpacity`
  border: 1px solid orange;
  border-radius: 2px;
  padding: 10px;
  width: 150px;
  margin-top: 20px;
`;

interface Props {}

interface State {
  lat?: number;
  lon?: number;
  error?: string;
  routeResults?: RouteSearchResponse;
  fetchingRoutes: LoadingState;
  fetchingLocation: LoadingState;
}
export default class MainScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lat: undefined,
      lon: undefined,
      error: undefined,
      routeResults: undefined,
      fetchingRoutes: LoadingState.UNKNOWN,
      fetchingLocation: LoadingState.UNKNOWN
    };
  }

  async componentDidMount() {
    await this.requestLocationPermissions()

    this.updateCurrentLocation();
  }

  async requestLocationPermissions() {
    try {
      if (Platform.OS === "android") {
        await requestLocationPermissionAndroid();
      }
    } catch (e) {
      this.setState({
        lat: DEFAULT_COORDS.lat,
        lon: DEFAULT_COORDS.lon,
        fetchingLocation: LoadingState.ERROR,
        error: `${e}. Using default values.`
      })
    }
  }

  updateCurrentLocation = () => {
    this.setState({ fetchingLocation: LoadingState.LOADING });
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: undefined,
          fetchingLocation: LoadingState.LOADED
        });
      },
      error =>
        this.setState({
          lat: DEFAULT_COORDS.lat,
          lon: DEFAULT_COORDS.lon,
          error: `${error.message} Using default coordinates.`,
          fetchingLocation: LoadingState.ERROR
        }),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 1000 }
    );
  };

  findRoute = async () => {
    const { lat, lon } = this.state;

    if (!lat || !lon) {
      this.setState({ error: "Could not find your geolocation" });
      return;
    }

    this.setState({ fetchingRoutes: LoadingState.LOADING, error: undefined });

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
      this.setState({ routeResults, fetchingRoutes: LoadingState.LOADED });
    } catch (e) {
      this.setState({ fetchingRoutes: LoadingState.ERROR, error: e.message });
    }
  };

  render() {
    const {
      lat,
      lon,
      routeResults,
      fetchingRoutes,
      fetchingLocation,
      error
    } = this.state;
    return (
      <MainContainer>
        {!routeResults ? (
          <RouteSearchForm
            currentCoordinates={{ lat, lon }}
            onSearchRoute={this.findRoute}
            fetchingRoutes={fetchingRoutes}
            fetchingLocation={fetchingLocation}
          />
        ) : (
          <View>
            <RouteSearchResults routeResults={routeResults} />
            <GoBackButton
              onPress={() => this.setState({ routeResults: undefined })}
            >
              <Text>Go Back</Text>
            </GoBackButton>
          </View>
        )}
        {error && <Text>{`ERROR: ${error}`}</Text>}
      </MainContainer>
    );
  }
}
