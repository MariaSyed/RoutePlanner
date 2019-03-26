import React from 'react'
import { Component } from 'react'
import { View, Text } from 'react-native';
import { RouteSearchResponse, Route } from '../types/RouteSearch';

interface Props {
  routeResults: RouteSearchResponse,
  errors?: [string]
}

interface State {
}

type RowProps = {
  title: string,
  value: string | number
}

const Row = ({ title, value }: RowProps ) => (
  <View>
    <Text>{title}</Text>
    <Text>{value}</Text>
  </View>
)
class RouteSearchResults extends Component<Props, State> {
  isEmpty = (obj: Object) => Object.entries(obj).length === 0

  render() {
    const { routeResults: { routes = {}}, errors } = this.props

    if (this.isEmpty(routes)) return <Text>No Route Found</Text>

    const publicTransportRoutes: [Route] = routes['publicTransport']

    return (
      <View>
        <Text>Public Transport</Text>
        {
          publicTransportRoutes.map((route, i) => (
            <View key={i}>
              <Row title={'total price'} value={route.totalPrice.formattedPrice} />
              <Row title={'distance:'} value={route.distance} />
            </View>
          ))
        }
      </View>
    )
  }
}

export default RouteSearchResults