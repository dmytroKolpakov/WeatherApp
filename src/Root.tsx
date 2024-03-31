/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';

import Home from './screens/Home';

import {useAppDispatch, useAppSelector} from './hooks/hooks';
import {ISettingsReducerState, IWeatherReducerState} from './types/actions';
import * as ACTIONS from './constants/actions';
import {storeData, getData} from './utils/storage';

const Root = () => {
  const dispatch = useAppDispatch();

  const weather = useAppSelector(state => state.weather);
  const settings = useAppSelector(state => state.settings);

  useEffect(() => {
    writeData('weather', weather);
  }, [weather]);

  useEffect(() => {
    if (
      settings.minCelsius !== 0 &&
      settings.location !== '' &&
      settings.searchHistory.length !== 0
    ) {
      writeData('settings', settings);
    }
  }, [settings]);

  useEffect(() => {
    readData();
  }, []);

  const writeData = async (
    key: string,
    data: IWeatherReducerState | ISettingsReducerState,
  ) => {
    await storeData(key, data);
  };

  const readData = async () => {
    const settingsData = await getData('settings');
    dispatch(
      ACTIONS.GET_WEATHER_FULL_INFO_ACTION(settingsData?.location || 'Kyiv'),
    );
    if (settingsData) {
      dispatch(ACTIONS.FORCE_SET_CONFIG_ACTION(settingsData));
    }
  };

  return <Home />;
};

export default Root;
