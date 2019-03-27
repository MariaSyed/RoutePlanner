import React from "react";
import { Component } from "react";
import { Route, RouteLeg } from "../../types/RouteSearch";
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

const RouteLegRow = ({
  leg: { departureTime, arrivalTime, travelMode, headingTo, line = {} }
}: RouteLegRowProps) => (
  <ResultText>
    {formattedTime(departureTime)} : {travelMode} {line.code} {headingTo} ({duration(
      departureTime,
      arrivalTime
    )} min)
  </ResultText>
);

interface Props {
  route: Route;
  key: number;
}

interface State {}

class ResultsListItem extends Component<Props, State> {
  render() {
    const defaultRouteLegs: RouteLeg[] = [];
    const {
      route: {
        departureTime = { time: "", timeZone: "" },
        arrivalTime = { time: "", timeZone: "" },
        legs = defaultRouteLegs,
        totalPrice = { formattedPrice: "" }
      }
    } = this.props;

    return (
      <Container>
        <Column1>
          <BoldText>
            {formattedTime(departureTime)} - {formattedTime(arrivalTime)}
          </BoldText>

          {legs.map((leg, i) => <RouteLegRow leg={leg} key={i} />)}
        </Column1>

        <Column2>
          <ResultText>{duration(departureTime, arrivalTime)} min</ResultText>
          <ResultText>{totalPrice.formattedPrice}</ResultText>
        </Column2>
      </Container>
    );
  }
}

export default ResultsListItem;
