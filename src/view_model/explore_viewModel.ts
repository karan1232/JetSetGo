import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {FlightsInterface, Result} from '../interface/flights_interface';
import {getFlights} from '../repository/network_data';

export const ExplorePageViewModel = () => {
  const [flightData, setFlightData] = useState<FlightsInterface>();
  const [filteredFlightList, setFilteredFlightList] = useState<Result[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const fetchFlightsData = async () => {
    try {
      setIsLoading(true);
      const receivedData = await getFlights();
      const tempList: Result[] = [];
      setFlightData(receivedData);
      setIsLoading(false);
      setIsError(false);
    } catch (err) {
      setIsError(true);
      setIsLoading(false);
      Snackbar.show({
        text: 'Something went wrong!!',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  useEffect(() => {
    fetchFlightsData();
  }, []);

  return {
    flightData,
    setFlightData,
    filteredFlightList,
    setFilteredFlightList,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    fetchFlightsData,
  };
};
