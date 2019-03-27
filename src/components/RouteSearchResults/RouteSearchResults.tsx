import React from "react";
import { Component } from "react";
import { Text } from "react-native";
import styled from "styled-components/native";
import { RouteSearchResponse, Route } from "../../types/RouteSearch";
import ResultsListItem from "./ResultsListItem";

const ResultsContainer = styled.ScrollView`
  height: 85%;
`;

const HeaderTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

interface Props {
  routeResults: RouteSearchResponse;
  errors?: [string];
}

interface State {}

class RouteSearchResults extends Component<Props, State> {
  isEmpty = (obj: Object) => Object.entries(obj).length === 0;

  render() {
    const {
      routeResults: { routes = {} },
      errors
    } = this.props;

    if (this.isEmpty(routes)) return <Text>No Route Found</Text>;

    const publicTransportRoutes: [Route] = routes["publicTransport"];

    return (
      <ResultsContainer>
        <HeaderTitle>Public Transport Options</HeaderTitle>

        {publicTransportRoutes.map((route, i) => (
          <ResultsListItem route={route} key={i} />
        ))}
      </ResultsContainer>
    );
  }
}

export default RouteSearchResults;
