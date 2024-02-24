import axios from 'axios';
import {FlightsInterface} from '../interface/flights_interface';

export const getFlights = async (): Promise<FlightsInterface> => {
  try {
    const response = await axios.get(
      'https://api.npoint.io/4829d4ab0e96bfab50e7',
    );
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw new Error();
  }
};
