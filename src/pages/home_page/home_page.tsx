import {View, Text, ScrollView, ActivityIndicator} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Card from '../../components/card';
import AppBar from '../../components/appbar';
import TextField from '../../components/textfield';
import PrimaryButton from '../../components/primary_button';
import CalendarIcon from '../../../assets/calendar.svg';
import FlightDetailCard from '../../components/flight_detail_card';
import DatePicker from 'react-native-date-picker';
import {dateFormatter} from '../../utils/formatter';
import {HomePageViewModel} from '../../view_model/home_viewModel';
import { useEffect } from 'react';

type Props = {};

const HomePage = (props: Props) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} edges={['top']}>
      <ScrollView>
        <AppBar style={{marginBottom: 20}} isPrimary={true} />
        <FlightDestinationCard />
        <FlashSaleTitle />
        <FlightDetailsList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

type FlightDestinationCardProps = {};

const FlightDestinationCard = (props: FlightDestinationCardProps) => {
  const {
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
  } = HomePageViewModel();

  return (
    <Card
      style={{
        alignSelf: 'stretch',
        padding: 12,
        marginHorizontal: 20,
        borderRadius: 12,
      }}>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Text
        style={{
          color: 'gray',
          fontSize: 17,
          fontWeight: '500',
          marginBottom: 8,
        }}>
        Flight Date
      </Text>
      <TextField
        value={dateFormatter(date) ?? ''}
        onPress={openDatePicker}
        enabled={false}
        style={{marginBottom: 15}}
        prefixIcon={
          <CalendarIcon
            height={20}
            width={20}
            style={{marginRight: 8}}
            color={'black'}
          />
        }
      />
      <View
        style={{
          flexDirection: 'row',
        }}>
        <View style={{flex: 1, marginRight: 12}}>
          <Text
            style={{
              color: 'gray',
              fontSize: 17,
              fontWeight: '500',
              marginBottom: 8,
            }}>
            Departure
          </Text>
          <TextField
            placeHolder="From"
            value={departure}
            onTextChange={updateDepartureValue}
          />
        </View>
        <View style={{flex: 1, marginBottom: 15}}>
          <Text
            style={{
              color: 'gray',
              fontSize: 17,
              fontWeight: '500',
              marginBottom: 8,
            }}>
            Arrival
          </Text>
          <TextField
            placeHolder="To"
            value={arrival}
            onTextChange={updateArrivalValue}
          />
        </View>
      </View>
      <PrimaryButton
        btnName="Find Flights"
        onPress={navigateToSearchedFlights}
      />
    </Card>
  );
};

type FlightDetailsListProps = {};

const FlightDetailsList = (props: FlightDetailsListProps) => {
  const {
    flightData,
    setFlightData,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    min,
    max,
    fetchFlightsData,
  } = HomePageViewModel();

  useEffect(() => {
    fetchFlightsData();
  }, []);


  const LoadingView = () => (
    <View style={{justifyContent: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  );

  return (
    <>
      {isLoading ? (
        <LoadingView />
      ) : (
        <>
          <FlightDetailCard
            data={
              flightData?.data.result[
                Math.floor(Math.random() * (max - min) + min)
              ]
            }
          />
          <FlightDetailCard
            data={
              flightData?.data.result[
                Math.floor(Math.random() * (max - min) + min)
              ]
            }
          />
          <FlightDetailCard
            data={
              flightData?.data.result[
                Math.floor(Math.random() * (max - min) + min)
              ]
            }
          />
        </>
      )}
    </>
  );
};

type FlashSaleTitleProps = {};

const FlashSaleTitle = (props: FlashSaleTitleProps) => {
  const {remainingTime, setRemainingTime, hours, minutes, seconds} =
    HomePageViewModel();

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

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        marginVertical: 26,
      }}>
      <Text style={{fontSize: 22, fontWeight: '600', color: 'black'}}>
        Flash Sale
      </Text>
      <View
        style={{
          backgroundColor: '#f1f2f3',
          justifyContent: 'center',
          paddingHorizontal: 10,
          paddingVertical: 2,
          borderRadius: 4,
        }}>
        <Text style={{color: 'gray', fontSize: 12}}>
          {hours.toString().padStart(2, '0')}H :{' '}
          {minutes.toString().padStart(2, '0')}M :{' '}
          {seconds.toString().padStart(2, '0')}S
        </Text>
      </View>
    </View>
  );
};
