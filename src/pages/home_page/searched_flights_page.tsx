import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/appbar';
import FilterIcon from '../../../assets/filter.svg';
import Card from '../../components/card';
import ForwardIcon from '../../../assets/arrow-forward-android.svg';
import CalendarIcon from '../../../assets/calendar.svg';
import FlightDetailCard from '../../components/flight_detail_card';
import {dateFormatter} from '../../utils/formatter';
import {SearchedFlightsPageViewModel} from '../../view_model/searchedFlights_viewModel';
import {Result} from '../../interface/flights_interface';

type SearchedFlightsPageProps = {};

const SearchedFlightsPage = ({}: SearchedFlightsPageProps) => {
  const {
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
  } = SearchedFlightsPageViewModel();

  console.log("hey rendered")

  return (
    <SafeAreaView edges={['top']} style={{flex: 1}}>
      <AppBar
        centerComponent={
          <AppbarCenterComponent
            arrival={route.params.arrival}
            departure={route.params.departure}
            date={new Date(route.params.date)}
          />
        }
        suffixComponent={<AppbarSufficComponent />}
      />
      <FlightsList
        isError={isError}
        isLoading={isLoading}
        chosenPlaceFlightList={chosenPlaceFlightList}
      />
    </SafeAreaView>
  );
};

export default SearchedFlightsPage;

type AppbarSufficComponentProps = {};

const AppbarSufficComponent = (props: AppbarSufficComponentProps) => {
  return (
    <Card style={{alignSelf: 'center', padding: 4, borderRadius: 6}}>
      <FilterIcon height={24} width={24} />
    </Card>
  );
};

type AppbarCenterComponentProps = {
  arrival?: string;
  departure?: string;
  date: Date;
};

const AppbarCenterComponent = ({
  arrival,
  departure,
  date,
}: AppbarCenterComponentProps) => {
  return (
    <View>
      <View
        style={{flexDirection: 'row', alignItems: 'center', marginBottom: 4}}>
        <Text style={{color: 'black'}}>{departure}</Text>
        <ForwardIcon height={20} width={20} style={{marginHorizontal: 8}} />
        <Text style={{color: 'black'}}>{arrival}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{marginRight: 4, color: 'gray'}}>
          {dateFormatter(date) ?? ''}
        </Text>
        <CalendarIcon height={16} width={16} color={'black'} />
      </View>
    </View>
  );
};

const ErrorView = () => (
  <View style={{justifyContent: 'center', alignSelf: 'center', flex: 1}}>
    <Text
      style={{
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 20,
        textAlign: 'center',
      }}>
      Due to some reason, we can't complete your request
    </Text>
  </View>
);

const LoadingView = () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <ActivityIndicator size={'large'} />
  </View>
);

const EmptyView = () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <Text
      style={{
        color: 'black',
        fontSize: 20,
        fontWeight: '500',
        marginHorizontal: 20,
        textAlign: 'center',
      }}>
      No data found for given parameters
    </Text>
  </View>
);

type FlightListProps = {
  isLoading: boolean;
  isError: boolean;
  chosenPlaceFlightList: Result[];
};
const FlightsList = ({
  isLoading,
  isError,
  chosenPlaceFlightList,
}: FlightListProps) => (
  <>
    {isLoading ? (
      <LoadingView />
    ) : isError ? (
      <ErrorView />
    ) : chosenPlaceFlightList?.length < 1 ? (
      <EmptyView />
    ) : (
      <FlatList
        contentContainerStyle={{paddingTop: 12}}
        data={chosenPlaceFlightList}
        renderItem={({item}) => <FlightDetailCard data={item} />}
        keyExtractor={item => item.id.toString()}
      />
    )}
  </>
);
