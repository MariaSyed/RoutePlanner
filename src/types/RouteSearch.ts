export interface RouteSearchRequest {
  start: Place,
  end: Place,
  timeType?: TimeType,
  time?: string,
  routeModes?: string,
  passengers?: {
    count?: number
  },
  extraInfo?: {
    extraLuggageCount?: number
  }
}

export interface RouteSearchResponse {
 routes?: {
   [key: string]: [Route]
 }
}

export type Coords = {
  lat: number,
  lon: number
}

export type Route = {
  requiredTerms?: [RequiredTerms],
  departureTime: RouteTime,
  arrivalTime: RouteTime,
  mainMode: MainMode,
  distance: number,
  duration: {
      min: number,
      max: number
  },
  legs: [RouteLeg],
  totalPrice: Price,
  request: RouteSearchRequest,
  preferred: boolean
}

type LocationType = 'address' | 'poi' | 'publicTransportStop' | 'carRentalPickupPoint' | 'bikeDock' | 'kyytiPickupPoint'

type TimeType = 'departure' | 'arrival'

type MainMode = 'kyyti' | 'publicTransport'

type TravelMode = 'walk' | 'bus' | 'flex'

type RequiredTerms = {
  url: string,
  version: string
}

type RouteTime = {
  time: string,
  toleranceBefore: number,
  toleranceAfter: number,
  isRealTime: boolean,
  timeZone: string
}

type RouteDuration = {
  min: number,
  max: number
}

type Price = {
  formattedPrice: string,
  total: number,
  currency: string,
  product: number,
  vat: number,
  calculatedAt: string
}

export type Place = {
  title?: string,
  subtitle?: string,
  name?: string,
  address?: string,
  city?: string,
  country?: string,
  type?: LocationType,
  categories?: [LocationType],
  location: Coords,
  stopCode?: number,
  stopId?: number,
  departureTime?: any,
  arrivalTime?: any,
}

type RouteLeg = {
  departureTime: RouteTime,
  arrivalTime: RouteTime,
  price: Price,
  distance: number,
  duration: RouteDuration,
  travelMode: TravelMode,
  places: [Place],
  shape: [[number, number]],
}

