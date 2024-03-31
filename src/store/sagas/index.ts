import {call, put, takeLatest} from 'redux-saga/effects';

import * as ACTIONS from '../../constants/actions';
import * as ENDPOINTS from '../../constants/endpoints';
import {api} from '../../utils/api';
import {
  ICurrentWeatherResponse,
  IFetchWeatherSaga,
  IForecastResponse,
} from '../../types/actions';

function* fetchWeather({payload: city}: IFetchWeatherSaga): Generator {
  const {data: current} = (yield call(
    api.get,
    ENDPOINTS.GET_TODAY_WEATHER_ENDPOINT(city),
  )) as {data: ICurrentWeatherResponse};
  const {data: forecast} = (yield call(
    api.get,
    ENDPOINTS.GET_FORECAST_WEATHER_ENDPOINT(city),
  )) as {data: IForecastResponse};
  yield put(ACTIONS.SET_CURRENT_WEATHER_ACTION(current));
  yield put(ACTIONS.SET_WEATHER_FORECAST_ACTION(forecast));
}

function* saga() {
  //@ts-ignore
  yield takeLatest(ACTIONS.GET_WEATHER_FULL_INFO_ACTION, fetchWeather);
}

export default saga;
