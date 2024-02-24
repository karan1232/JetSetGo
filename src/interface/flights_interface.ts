export interface FlightsInterface {
    data: Data
    message: string
  }
  
  export interface Data {
    result: Result[]
  }
  
  export interface Result {
    id: string
    fare: number
    displayData: DisplayData
  }
  
  export interface DisplayData {
    source: Source
    airlines: Airline[]
    stopInfo: string
    destination: Destination
    totalDuration: string
  }
  
  export interface Source {
    airport: Airport
    depTime: string
  }
  
  export interface Airport {
    cityCode: string
    cityName: string
    terminal: string
    airportCode: string
    airportName: string
    countryCode: string
    countryName: string
  }
  
  export interface Airline {
    airlineCode: string
    airlineName: string
    flightNumber: string
  }
  
  export interface Destination {
    airport: Airport2
    arrTime: string
  }
  
  export interface Airport2 {
    cityCode: string
    cityName: string
    terminal: string
    airportCode: string
    airportName: string
    countryCode: string
    countryName: string
  }
  