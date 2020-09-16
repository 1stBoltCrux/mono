export const OPEN_WEATHER_URL =
  'https://api.openweathermap.org/data/2.5/onecall?lat=60.99&lon=30.9&dt=1600041600&appid=';
export const DAYS_OF_THE_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]
export const kelvinToFahrenheit = (k) => {
  return (k - 273.15) * 9 / 5 + 32;
}
