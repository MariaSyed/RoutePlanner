import React from "react";
import { Component } from "react";
import { View, Text, Platform } from "react-native";
import styled from "styled-components/native";

import { requestLocationPermissionAndroid } from "../utils/AndroidPermissions";
import API from "../services/Api";
import RouteSearchForm from "../components/RouteSearchForm";
import { RouteSearchRequest, RouteSearchResponse } from "../types/RouteSearch";
import RouteSearchResults from "../components/RouteSearchResults";
import { KYYTI_GROUP_LOCATION } from "../constants/Locations";
import { LoadingState } from "../types/LoadingState";

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
  fetching: LoadingState;
}
export default class MainScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      lat: undefined,
      lon: undefined,
      error: undefined,
      routeResults: undefined,
      fetching: LoadingState.UNKNOWN
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      requestLocationPermissionAndroid();
    } else {
      navigator.geolocation.requestAuthorization();
    }

    this.updateCurrentLocation();
  }

  updateCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          error: undefined
        });
      },
      error => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  findRoute = async () => {
    const { lat, lon } = this.state;

    if (!lat || !lon) {
      this.setState({ error: "Could not find your geolocation" });
      return;
    }

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
      this.setState({ routeResults, fetching: LoadingState.LOADED });
    } catch (e) {
      // TODO: Handle error state
      this.setState({ fetching: LoadingState.ERROR, error: e.message });
    }
  };

  render() {
    const { lat, lon, routeResults, fetching, error } = this.state;
    return (
      <MainContainer>
        {!routeResults ? (
          <RouteSearchForm
            currentCoordinates={{ lat, lon }}
            onSearchRoute={this.findRoute}
            fetching={fetching}
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
