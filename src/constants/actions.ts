import {createAction} from '@reduxjs/toolkit';
import {
  ISearchHistory,
  ISettingsReducerState,
  IWeatherReducerState,
} from '../types/actions';

export const FORCE_SET_CONFIG_ACTION = createAction<ISettingsReducerState>(
  'config/FORCE_SET_CONFIG_ACTION',
);

export const SET_CONFIG_MIN_CELSIUS_VALUE_ACTION = createAction<
  ISettingsReducerState['minCelsius']
>('config/SET_CONFIG_MIN_CELSIUS_VALUE_ACTION');

export const SET_CONFIG_LOCATION_ACTION = createAction<
  ISettingsReducerState['location']
>('config/SET_CONFIG_LOCATION_ACTION');

export const GET_WEATHER_FULL_INFO_ACTION = createAction<string>(
  'weather/GET_WEATHER_FULL_INFO_ACTION',
);

export const SET_CURRENT_WEATHER_ACTION = createAction<
  IWeatherReducerState['current']
>('weather/SET_CURRENT_WEATHER_ACTION');

export const SET_WEATHER_FORECAST_ACTION = createAction<
  IWeatherReducerState['forecast']
>('weather/SET_WEATHER_FORECAST_ACTION');

export const ADD_TO_HISTORY_ACTION = createAction<ISearchHistory>(
  'config/ADD_TO_HISTORY_ACTION',
);
