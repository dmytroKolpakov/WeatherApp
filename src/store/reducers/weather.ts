import {createReducer} from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import _ from 'lodash';

import * as ACTIONS from '../../constants/actions';
import {IWeatherReducerState} from '../../types/actions';
import {daysOfWeek} from '../../constants/constants';

const initialState: IWeatherReducerState = {
  current: null,
  forecast: null,
  weatherList: [],
};

export const weatherReducer = createReducer(initialState, builder => {
  builder.addCase(
    ACTIONS.SET_CURRENT_WEATHER_ACTION,
    (
      state: IWeatherReducerState,
      {payload: current}: {payload: IWeatherReducerState['current']},
    ) => ({
      ...state,
      current,
    }),
  );
  builder.addCase(
    ACTIONS.SET_WEATHER_FORECAST_ACTION,
    (
      state: IWeatherReducerState,
      {payload: forecast}: {payload: IWeatherReducerState['forecast']},
    ) => {
      const todaysDayIndex = dayjs().day();
      const daysForecast: Record<string, any[]> = {};
      daysOfWeek?.map((d: string) => {
        daysForecast[d] = [];
      });
      forecast?.list?.map(el => {
        const dayIndex = dayjs(el.dt_txt).day();
        if (dayIndex === todaysDayIndex) {
          return;
        }
        daysForecast[daysOfWeek[dayIndex]].push(el);
      });
      daysForecast[daysOfWeek[todaysDayIndex]].push(state.current);
      const result = daysOfWeek
        ?.map((d: string) => {
          const neededElementIndex = _.findIndex(
            daysForecast[d],
            l => +dayjs(l?.dt_txt).format('HH') >= 12,
          );
          const selectedElement =
            neededElementIndex && neededElementIndex >= 0
              ? daysForecast[d][neededElementIndex]
              : _.last(daysForecast[d]);
          return selectedElement || null;
        })
        .sort((a, b) => {
          if (!a?.dt_txt) {
            return -1;
          }
          if (dayjs(a.dt_txt).millisecond() > dayjs(b.dt_txt).millisecond()) {
            return 1;
          }
          if (dayjs(a.dt_txt).millisecond() < dayjs(b.dt_txt).millisecond()) {
            return -1;
          }
          return 0;
        })
        .filter(el => !!el);
      return {
        ...state,
        forecast: forecast,
        weatherList: [...result],
      };
    },
  );
});
