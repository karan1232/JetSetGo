import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import Snackbar from 'react-native-snackbar';
import { getFlights } from '../repository/network_data';

export const HomePageViewModel = () => {
  const navigator = useNavigation();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  const [departure, setDeparture] = useState<string>('');
  const [arrival, setArrival] = useState<string>('');

  const navigateToSearchedFlights = () => {
    if (departure.length > 0 && arrival.length > 0) {
      navigator.navigate('SearchedFlightsPage', {
        departure: departure,
        arrival: arrival,
        date: date.toISOString(),
      });
      setArrival('');
      setDeparture('');
    } else {
      Snackbar.show({
        text: 'Both Departure and Arrival values are required',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  };

  const openDatePicker = () => {
    setOpen(true);
  };

  const updateArrivalValue = (val: string) => {
    setArrival(val);
  };

  const updateDepartureValue = (val: string) => {
    setDeparture(val);
  };


  const [remainingTime, setRemainingTime] = useState(5400);

  const hours = Math.floor(remainingTime / 3600);
  const minutes = Math.floor((remainingTime % 3600) / 60);
  const seconds = remainingTime % 60;

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime]);


  const [flightData, setFlightData] = useState<FlightsInterface>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const min: number = 0;
  let max: number = 0;

  const fetchFlightsData = async () => {
    try {
      setIsLoading(true);
      const receivedData = await getFlights();
      max = receivedData.data.result.length;
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
    date,
    setDate,
    open,
    setOpen,
    departure,
    setDeparture,
    arrival,
    setArrival,
    navigateToSearchedFlights,
    openDatePicker,
    updateArrivalValue,
    updateDepartureValue,
    remainingTime, setRemainingTime,
    hours,
    minutes,
    seconds,
    flightData, setFlightData,
    isLoading, setIsLoading,
    isError, setIsError,
    min,
    max,
    fetchFlightsData,
  };
};
