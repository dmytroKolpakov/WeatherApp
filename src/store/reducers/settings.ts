import {createReducer} from '@reduxjs/toolkit';
import _ from 'lodash';

import * as ACTIONS from '../../constants/actions';
import {ISearchHistory, ISettingsReducerState} from '../../types/actions';

const initialState: ISettingsReducerState = {
  minCelsius: 0,
  location: '',
  searchHistory: [],
};

export const settingsReducer = createReducer(initialState, builder => {
  builder.addCase(
    ACTIONS.FORCE_SET_CONFIG_ACTION,
    (
      state: ISettingsReducerState,
      {payload}: {payload: ISettingsReducerState},
    ) => ({
      ...payload,
    }),
  );
  builder.addCase(
    ACTIONS.SET_CONFIG_MIN_CELSIUS_VALUE_ACTION,
    (
      state: ISettingsReducerState,
      {payload: minCelsius}: {payload: ISettingsReducerState['minCelsius']},
    ) => ({
      ...state,
      minCelsius,
    }),
  );
  builder.addCase(
    ACTIONS.SET_CONFIG_LOCATION_ACTION,
    (
      state: ISettingsReducerState,
      {payload: location}: {payload: ISettingsReducerState['location']},
    ) => ({
      ...state,
      location,
    }),
  );
  builder.addCase(
    ACTIONS.ADD_TO_HISTORY_ACTION,
    (
      state: ISettingsReducerState,
      {payload: search}: {payload: ISearchHistory},
    ) => {
      const oldState = state.searchHistory.filter(
        el => el.value !== search.value,
      );
      const oldHomeIndex = _.findIndex(oldState, el => el.isHome);
      let mutatedState: ISearchHistory[] = [];
      if (search.isHome && oldHomeIndex >= 0) {
        oldState.map((item, index) => {
          if (index === oldHomeIndex) {
            mutatedState.push({...item, isHome: false});
          } else {
            mutatedState.push(item);
          }
        });
      } else {
        mutatedState = [...oldState];
      }
      const sH = [search, ...mutatedState];
      return {
        ...state,
        searchHistory: [...sH],
      };
    },
  );
});
