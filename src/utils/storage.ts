import AsyncStorage from '@react-native-async-storage/async-storage';
import {ISettingsReducerState, IWeatherReducerState} from '../types/actions';

export const storeData = async (
  key: string,
  value: IWeatherReducerState | ISettingsReducerState,
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};

export const getData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};
