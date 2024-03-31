export const GET_TODAY_WEATHER_ENDPOINT = (city: string = 'Amsterdam') =>
  `/weather?q=${city}&appid=19ac47b88d8c24af1610953bdb28cf9b&units=metric`;

export const GET_FORECAST_WEATHER_ENDPOINT = (city: string = 'Amsterdam') =>
  `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=19ac47b88d8c24af1610953bdb28cf9b&units=metric&cnt=100`;
