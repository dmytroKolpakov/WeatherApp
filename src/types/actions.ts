export interface ISettingsReducerState {
  minCelsius: number;
  location: string;
  searchHistory: ISearchHistory[];
}

export interface ISearchHistory {
  id: string;
  value: string;
  isHome: boolean;
}

export interface IWeatherReducerState {
  current: ICurrentWeatherResponse | null;
  forecast: IForecastResponse | null;
  weatherList: IForecastListItem[];
}

export interface IFetchWeatherSaga {
  payload: string;
}

export interface IForecastWeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface ICoords {
  lat: number;
  lon: number;
}

export interface IWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface IForecastListItem {
  dt: number; //time in milliseconds
  main: IMainWeatherInfo;
  weather: IForecastWeatherItem[];
  clouds: {
    all: number;
  };
  wind: IWind;
  visibility: number;
  pop: number;
  sys: {
    pod: number;
  };
  dt_txt: string; //Date string
}

export interface IMainWeatherInfo {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level?: number;
  grnd_level?: number;
  humidity: number;
  temp_kf?: number;
}

export interface IForecastResponse {
  cod: number;
  message: number;
  cnt: number;
  list: IForecastListItem[];
  city: {
    id: number;
    name: string;
    coord: ICoords;
    country: string;
    population: number;
    timezone: number;
    sunrise: number; //time in milliseconds
    sunset: number; //time in milliseconds
  };
}

export interface ICurrentWeatherResponse {
  coord: ICoords;
  weather: IForecastWeatherItem[];
  base: string;
  main: IMainWeatherInfo;
  visibility: number;
  wind: IWind;
  clouds: {
    all: number;
  };
  dt: number; // milliseconds
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number; //time in milliseconds
    sunset: number; //time in milliseconds
  };
  timezone: number;
  id: number;
  name: string; // City
  cod: number;
}
