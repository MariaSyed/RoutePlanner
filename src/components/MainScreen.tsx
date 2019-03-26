import React from 'react';
import { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { requestLocationPermissionAndroid } from '../utils/AndroidPermissions';
import API from '../services/Api';
import RouteSearchForm from '../components/RouteSearchForm';
import { RouteSearchRequest, RouteSearchResponse } from '../types/RouteSearch';
import RouteSearchResults from '../components/RouteSearchResults';
import { KYYTI_GROUP_LOCATION } from '../constants/Locations';

interface Props {}

interface State {
  lat: number,
  lon: number,
  error?: string,
  routeResults?: RouteSearchResponse
}
export default class MainScreen extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      lat: 60.2033217,
      lon: 24.6562533,
      error: undefined,
      routeResults: undefined
    }
  }


  componentDidMount() {
    // if (Platform.OS === 'android') requestLocationPermissionAndroid()

    // navigator.geolocation.requestAuthorization()

    // this.updateCurrentLocation()
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
  }

  searchRoute = async () => {
    const { lat, lon } = this.state
    const query: RouteSearchRequest = {
      start: {
        location: {
          lat,
          lon
        }
      },
      end: KYYTI_GROUP_LOCATION,
      routeModes: 'publicTransport'
    }

    try {
      const routeResults = await API.postRouteSearch(query)
      this.setState({ routeResults })
    } catch (e) {
      // TODO: Handle error
      console.error(e)
    }

  }

  render() {
    const { lat, lon, routeResults } = this.state
    return (
      <View>
        {
          !routeResults
          ?
          <RouteSearchForm
          currentCoordinates={{ lat, lon }}
          onSearchRoute={this.searchRoute}
          />
          : <RouteSearchResults
          routeResults={routeResults}
        />
        }
        <TouchableOpacity onPress={() => this.setState({ routeResults: undefined })}>
          <Text>Clear search</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
