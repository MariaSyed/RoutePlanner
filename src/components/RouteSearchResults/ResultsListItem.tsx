import React from "react";
import { Component } from "react";
import moment from "moment-timezone";
import { RouteTime, Route, RouteLeg } from "../../types/RouteSearch";
import styled from "styled-components/native";
import { formattedTime, duration } from "../../utils/TimeFormatter";

const Container = styled.View`
  border-bottom-width: 0.5;
  border-bottom-color: #ccc;
  padding: 20px 10px;
  display: flex;
  width: 100%;
  flex-direction: row;
`;

const Column1 = styled.View`
  flex: 3;
  width: 200px;
  height: 100%;
`;

const Column2 = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const ResultText = styled.Text`
  margin-bottom: 5px;
`;

const BoldText = styled(ResultText)`
  font-weight: bold;
  margin-bottom: 8px;
`;

interface RouteLegRowProps {
  leg: RouteLeg;
}

const RouteLegRow = ({ leg }: RouteLegRowProps) => (
  <ResultText>
    {formattedTime(leg.departureTime)} : {leg.travelMode}{" "}
    {(leg.line || {}).code} {leg.headingTo} ({duration(
      leg.departureTime,
      leg.arrivalTime
    )}{" "}
    min)
  </ResultText>
);

interface Props {
  route: Route;
  key: number;
}

interface State {}

class ResultsListItem extends Component<Props, State> {
  render() {
    const { route } = this.props;

    return (
      <Container>
        <Column1>
          <BoldText>
            {formattedTime(route.departureTime)} -{" "}
            {formattedTime(route.arrivalTime)}
          </BoldText>

          {route.legs.map((leg, i) => <RouteLegRow leg={leg} key={i} />)}
        </Column1>

        <Column2>
          <ResultText>
            {duration(route.departureTime, route.arrivalTime)} min
          </ResultText>
          <ResultText>{route.totalPrice.formattedPrice}</ResultText>
        </Column2>
      </Container>
    );
  }
}

export default ResultsListItem;
