import React from 'react';
import { Component } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { requestLocationPermissionAndroid } from './src/utils/AndroidPermissions';
import API from './src/services/Api';
import RouteSearchForm from './src/components/RouteSearchForm';
import { RouteSearchRequest, RouteSearchResponse } from './src/types/RouteSearch';
import RouteSearchResults from './src/components/RouteSearchResults';

interface Props {}

interface State {
  lat: number,
  lon: number,
  error?: string,
  routeResults: RouteSearchResponse
}
export default class App extends Component<Props, State> {

  constructor(props: Props) {
    super(props)

    this.state = {
      lat: 60.2033217,
      lon: 24.6562533,
      error: undefined,
      routeResults: {}
    }
  }


  componentDidMount() {
    // if (Platform.OS === 'android') requestLocationPermissionAndroid()

    // navigator.geolocation.requestAuthorization()

    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       latitude: position.coords.latitude,
    //       longitude: position.coords.longitude,
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
      end: {
        name: 'Kyyti Group',
        address: "Fredrikinkatu 47",
        city: "Helsinki",
        country: "Suomi",
        type: "poi",
        location: {
            lat: 60.166966,
            lon: 24.933360
        }
      },
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
      <SafeAreaView style={styles.container}>
        <RouteSearchForm
          currentCoordinates={{ lat, lon }}
          onSearchRoute={this.searchRoute}
        />
        <RouteSearchResults
          routeResults={routeResults}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
