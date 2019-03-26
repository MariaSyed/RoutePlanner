import React from "react";
import { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Coords } from "../types/RouteSearch";

interface Props {
  currentCoordinates: Coords;
  onSearchRoute: () => void;
}

interface State {}

class RouteSearchForm extends Component<Props, State> {
  render() {
    const {
      currentCoordinates: { lat, lon },
      onSearchRoute
    } = this.props;

    return (
      <View>
        <Text>
          Your location: {lat} {lon}{" "}
        </Text>

        <Text>Destination: Kyyti HeadQuarters</Text>

        <TouchableOpacity onPress={onSearchRoute}>
          <Text>Find route</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default RouteSearchForm;
