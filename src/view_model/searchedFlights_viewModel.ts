import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import {getFlights} from '../repository/network_data';
import {FlightsInterface, Result} from '../interface/flights_interface';
import {RouteProp, useRoute} from '@react-navigation/native';
import {RootStackParamList} from '../../App';

export const SearchedFlightsPageViewModel = () => {
  const [unfilteredFlightData, setunfilteredFlightData] =
    useState<FlightsInterface>();
  const [chosenPlaceFlightList, setChosenPlaceFlightList] = useState<Result[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const route =
    useRoute<RouteProp<RootStackParamList, 'SearchedFlightsPage'>>();

  const fetchFlightsData = async () => {
    try {
      setIsLoading(true);
      const receivedData = await getFlights();
      const tempList: Result[] = [];
      receivedData.data.result.forEach(flightDetail => {
        if (
          flightDetail.displayData.source.airport.cityName.toLocaleLowerCase() ===
            route.params.departure.toLowerCase() &&
          flightDetail.displayData.destination.airport.cityName.toLocaleLowerCase() ===
            route.params.arrival.toLowerCase() &&
          new Date(route.params.date) <
            new Date(flightDetail.displayData.source.depTime)
        ) {
          tempList.push(flightDetail);
        }
      });
      setChosenPlaceFlightList(tempList);
      setunfilteredFlightData(receivedData);
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
    unfilteredFlightData,
    setunfilteredFlightData,
    chosenPlaceFlightList,
    setChosenPlaceFlightList,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    route,
    fetchFlightsData,
  };
};
