import {Pressable, Text, View} from 'react-native';
import Card from './card';
import FlightIcon from '../../assets/flight.svg';
import {useNavigation} from '@react-navigation/native';
import PrimaryButton from './primary_button';
import Snackbar from 'react-native-snackbar';
import {Result} from '../interface/flights_interface';
import moment from 'moment';
import {timeFormatter} from '../utils/formatter';

type FlashSaleCardProps = {data?: Result};

const FlightDetailCard = ({data}: FlashSaleCardProps) => {
  const navigator = useNavigation();

  const bookFlight = () => {
    Snackbar.show({
      text: 'Hooray! Flight booked',
      duration: Snackbar.LENGTH_SHORT,
    });
  };

  return (
    <Card
      style={{
        marginHorizontal: 20,
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 12,
        marginBottom: 16,
      }}>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          marginBottom: 16,
        }}>
        <View
          style={{
            backgroundColor: '#f1f2f3',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            marginRight: 8,
            marginBottom: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FlightIcon
            height={22}
            width={22}
            style={{marginRight: 2}}
            color={'gray'}
          />
          <Text style={{color: 'gray', fontSize: 14}}>Free luggage 10Kg</Text>
        </View>
        <View
          style={{
            backgroundColor: '#f1f2f3',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FlightIcon
            height={22}
            width={22}
            style={{marginRight: 2}}
            color={'gray'}
          />
          <Text style={{color: 'gray', fontSize: 14}}>Christmas Disc</Text>
        </View>
        <View
          style={{
            backgroundColor: '#f1f2f3',
            justifyContent: 'center',
            paddingHorizontal: 10,
            paddingVertical: 6,
            borderRadius: 6,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <FlightIcon
            height={22}
            width={22}
            style={{marginRight: 2}}
            color={'gray'}
          />
          <Text style={{color: 'gray', fontSize: 14}}>Christmas Disc</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}>
        <View style={{flex: 1}}>
          <Text style={{color: 'gray', marginBottom: 6}}>
            {data?.displayData.source.airport.cityName}
          </Text>
          <Text
            style={{
              color: 'black',
              marginBottom: 6,
              fontSize: 18,
              fontWeight: '500',
            }}>
            {data?.displayData.source.airport.cityCode}
          </Text>
          <Text style={{color: 'gray'}}>
            {timeFormatter(data?.displayData.source.depTime ?? '')}
          </Text>
        </View>

        <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={{color: 'gray', marginBottom: 6}}>
            {data?.displayData.airlines[0].airlineCode} -{' '}
            {data?.displayData.airlines[0].flightNumber}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flex: 1,
                margin: 8,
              }}
            />
            <View
              style={{
                backgroundColor: 'black',
                borderRadius: 100,
                padding: 4,
                marginBottom: 6,
              }}>
              <FlightIcon height={24} width={24} color={'white'} />
            </View>
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                flex: 1,
                margin: 8,
              }}
            />
          </View>
          <Text style={{color: 'gray'}}>
            {data?.displayData.totalDuration.toUpperCase()}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{color: 'gray', marginBottom: 6}}>
            {data?.displayData.destination.airport.cityName}
          </Text>
          <Text
            style={{
              color: 'black',
              marginBottom: 6,
              fontSize: 18,
              fontWeight: '500',
            }}>
            {data?.displayData.destination.airport.cityCode}
          </Text>
          <Text style={{color: 'gray'}}>
            {timeFormatter(data?.displayData.destination.arrTime ?? '')}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 8,
        }}>
        <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
          {data?.displayData.airlines[0].airlineName}
        </Text>
        <Text style={{fontSize: 20, fontWeight: '600', color: 'black'}}>
          ₹{data?.fare}
        </Text>
      </View>
      <PrimaryButton btnName="Book Flight" onPress={bookFlight} />
    </Card>
  );
};

export default FlightDetailCard;
