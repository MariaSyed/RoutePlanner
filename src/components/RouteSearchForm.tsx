import React from "react";
import { Component } from "react";
import styled from "styled-components/native";
import { Coords } from "../types/RouteSearch";
import { LoadingState } from "../types/LoadingState";
import { ActivityIndicator, Text } from "react-native";
import { KYYTI_GROUP_LOCATION } from "../constants/Locations";

const FormContainer = styled.View`
  display: flex;
  margin: 40% 20px;
`;

const InputLabel = styled.Text`
  font-size: 14px;
  margin-bottom: 10px;
  font-weight: 200;
`;

const Input = styled.TextInput`
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 20px;
  background-color: ${(props: { disabled: boolean }) =>
    props.disabled ? "#efefef" : "#fff"};
`;

const CoordinateInputsWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

const CoordinatesLabel = styled.Text`
  padding: 10px;
`;

const SubmitButton = styled.TouchableOpacity`
  background-color: #ff6e00;
  padding: 20px;
  border-radius: 5px;
`;

const SubmitButtonText = styled.Text`
  text-align: center;
  color: #fff;
  font-size: 16px;
`;

interface Props {
  currentCoordinates: Coords;
  onSearchRoute: () => void;
  fetching: LoadingState;
}

interface State {}

class RouteSearchForm extends Component<Props, State> {
  render() {
    const {
      currentCoordinates: { lat, lon },
      onSearchRoute,
      fetching
    } = this.props;

    return (
      <FormContainer>
        <InputLabel>Your Location</InputLabel>
        <CoordinateInputsWrapper>
          <CoordinatesLabel>Lat: </CoordinatesLabel>
          <Input value={`${lat}`} editable={false} disabled />

          <CoordinatesLabel>Long: </CoordinatesLabel>
          <Input value={`${lon}`} editable={false} disabled />
        </CoordinateInputsWrapper>

        <InputLabel>Destination</InputLabel>
        <Input value={KYYTI_GROUP_LOCATION.address} editable={false} disabled />

        <SubmitButton
          onPress={onSearchRoute}
          disabled={fetching === LoadingState.LOADING}
        >
          {fetching === LoadingState.LOADING ? (
            <ActivityIndicator color={"white"} size={"small"} />
          ) : (
            <SubmitButtonText>Find route</SubmitButtonText>
          )}
        </SubmitButton>
      </FormContainer>
    );
  }
}

export default RouteSearchForm;
