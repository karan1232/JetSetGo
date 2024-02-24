import {View, Text, FlatList, ActivityIndicator, Pressable} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/appbar';
import Card from '../../components/card';
import FilterIcon from '../../../assets/filter.svg';
import Snackbar from 'react-native-snackbar';
import {FlightsInterface, Result} from '../../interface/flights_interface';
import {getFlights} from '../../repository/network_data';
import FlightDetailCard from '../../components/flight_detail_card';
import {ExplorePageViewModel} from '../../view_model/explore_viewModel';

type Props = {};

const ExplorePage = (props: Props) => {
  const CenterAppbarComponent = () => (
    <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
      Explore
    </Text>
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} edges={['top']}>
      <AppBar
        suffixComponent={<AppbarSufficComponent />}
        haveBackIcon={false}
        centerComponent={<CenterAppbarComponent />}
      />
      <FlightDetailCardList />
    </SafeAreaView>
  );
};

export default ExplorePage;

type AppbarSufficComponentProps = {onPress?: () => void};

const AppbarSufficComponent = ({onPress}: AppbarSufficComponentProps) => {
  return (
    <Pressable onPress={onPress}>
      <Card style={{alignSelf: 'center', padding: 4, borderRadius: 6}}>
        <FilterIcon height={24} width={24} />
      </Card>
    </Pressable>
  );
};

const LoadingView = () => (
  <View style={{flex: 1, justifyContent: 'center'}}>
    <ActivityIndicator size={'large'} />
  </View>
);

type PFlightDetailCardListrops = {};

const FlightDetailCardList = (props: PFlightDetailCardListrops) => {
  const {
    flightData,
    setFlightData,
    filteredFlightList,
    setFilteredFlightList,
    isLoading,
    setIsLoading,
    isError,
    setIsError,
    fetchFlightsData,
  } = ExplorePageViewModel();

  return (
    <>
      {isLoading ? (
        <LoadingView />
      ) : (
        <FlatList
          style={{backgroundColor: 'white'}}
          contentContainerStyle={{paddingTop: 12}}
          data={flightData?.data.result}
          renderItem={({item}) => <FlightDetailCard data={item} />}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </>
  );
};
