import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  Button,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppBar from '../../components/appbar';
import Card from '../../components/card';
import FilterIcon from '../../../assets/filter.svg';
import FlightDetailCard from '../../components/flight_detail_card';
import {Modalize} from 'react-native-modalize';
import PriceTagIcon from '../../../assets/price-tag.svg';
import TickIcon from '../../../assets/tick.svg';
import FlightIcon from '../../../assets/flight-icon.svg';
import PrimaryButton from '../../components/primary_button';
import Snackbar from 'react-native-snackbar';
import {FlightsInterface, Result} from '../../interface/flights_interface';
import {getFlights} from '../../repository/network_data';

type Props = {};

const ExplorePage = (props: Props) => {
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
      setFilteredFlightList(receivedData.data.result);
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

  const modalizeRef = useRef<Modalize>();
  const [priceIndex, setPriceIndex] = useState<number>(0);
  const [flightFilterBrand, setFlightFilterBrand] = useState<string>('');
  const [brandList, setBrandList] = useState<string[]>([]);

  const openModal = () => {
    const tempList: string[] = [];
    flightData?.data.result.forEach(flightData => {
      if (!tempList.includes(flightData.displayData.airlines[0].airlineName)) {
        tempList.push(flightData.displayData.airlines[0].airlineName);
      }
    });
    setBrandList(tempList);
    modalizeRef.current?.open();
  };

  const closeModal = () => {
    modalizeRef.current?.close();
  };

  const selectPriceFilter = (index: number) => {
    setPriceIndex(index);
  };

  const selectFlightBrandFilter = (brand: string) => {
    setFlightFilterBrand(brand);
  };

  const clearFilters = () => {
    setFlightFilterBrand('');
    setPriceIndex(0);
  };

  // const applyFilters = () => {
  //   if (priceIndex === 1) {
      
  //     let tempAscendingList = [];
  //     tempAscendingList = filteredFlightList.sort(
  //       (a, b) => (a.fare ?? 0) - (b.fare ?? 0)
  //     );
  //     setFilteredFlightList(tempAscendingList);
  //   } else if (priceIndex === 2) {
  //     let tempDecendingList = [];
  //     tempDecendingList = filteredFlightList.sort( 
  //       (a, b) => b.fare ?? 0 - a.fare ?? 0,
  //     );
  //     setFilteredFlightList(tempDecendingList);
  //   }
  //     filteredFlightList.forEach(element =>
  //       console.log(`hey data ${element.fare ?? 0}`),
  //     );
  //   closeModal();
  // };

  const CenterAppbarComponent = () => (
    <Text style={{color: 'black', fontSize: 20, fontWeight: '600'}}>
      Explore
    </Text>
  );

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
    return (
      <>
        {isLoading ? (
          <LoadingView />
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            style={{backgroundColor: 'white'}}
            contentContainerStyle={{paddingTop: 12}}
            data={filteredFlightList}
            renderItem={({item}) => <FlightDetailCard data={item} />}
            keyExtractor={item => item.id.toString()}
          />
        )}
      </>
    );
  };

  type PriceFilterTileProps = {
    priceType: string;
    onPress: () => void;
    isSelected?: boolean;
  };

  const PriceFilterTile = ({
    priceType,
    onPress,
    isSelected,
  }: PriceFilterTileProps) => {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f2f2f2',
            padding: 12,
            borderRadius: 12,
            marginBottom: 8,
          }}>
          <PriceTagIcon
            height={20}
            width={20}
            color={'black'}
            style={{marginRight: 12}}
          />
          <Text>Price {priceType}</Text>
          <View style={{flex: 1}} />
          {isSelected ? (
            <TickIcon height={20} width={20} color={'black'} />
          ) : null}
        </View>
      </Pressable>
    );
  };

  type FlightFilterTileProps = {
    brandName: string;
    onPress: () => void;
    isSelected?: boolean;
  };

  const FlightFilterTile = ({
    brandName,
    onPress,
    isSelected,
  }: FlightFilterTileProps) => {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#f2f2f2',
            padding: 12,
            borderRadius: 12,
            marginBottom: 8,
          }}>
          <FlightIcon
            height={20}
            width={20}
            color={'black'}
            style={{marginRight: 12}}
          />
          <Text>{brandName}</Text>
          <View style={{flex: 1}} />
          {isSelected ? (
            <TickIcon height={20} width={20} color={'black'} />
          ) : null}
        </View>
      </Pressable>
    );
  };

  const FilterModal = () => {
    return (
      <View style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '500',
              marginBottom: 12,
            }}>
            Sory by
          </Text>
          <Pressable onPress={clearFilters}>
            <Text style={{color: '#5A71D4'}}>Clear all</Text>
          </Pressable>
        </View>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 6,
          }}>
          Price: -
        </Text>
        <PriceFilterTile
          priceType="(low to high)"
          isSelected={priceIndex === 1}
          onPress={() => selectPriceFilter(1)}
        />
        <PriceFilterTile
          priceType="(high to low)"
          isSelected={priceIndex === 2}
          onPress={() => selectPriceFilter(2)}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
            marginBottom: 6,
          }}>
          Brand: -
        </Text>
        {brandList.map(brandName => {
          return (
            <FlightFilterTile
              key={brandName}
              brandName={brandName}
              isSelected={brandName === flightFilterBrand}
              onPress={() => setFlightFilterBrand(brandName)}
            />
          );
        })}
        <View style={{height: 12}} />
        <PrimaryButton btnName="Apply" onPress={() => {closeModal()}} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}} edges={['top']}>
      <AppBar
        suffixComponent={<AppbarSufficComponent onPress={openModal} />}
        haveBackIcon={false}
        centerComponent={<CenterAppbarComponent />}
      />
      <FlightDetailCardList />
      <Modalize adjustToContentHeight={true} ref={modalizeRef}>
        <FilterModal />
      </Modalize>
    </SafeAreaView>
  );
};

export default ExplorePage;
