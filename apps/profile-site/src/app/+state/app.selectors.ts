import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.models';
import { getDay, format } from 'date-fns';
import { DAYS_OF_THE_WEEK, kelvinToFahrenheit } from './app.constants';

const getAppState = createFeatureSelector<AppState>('app');

const getProjects = createSelector(
  getAppState,
  state => state && state.projects
)

const getWeatherData = createSelector(
  getAppState,
  state => state && state.weatherData
)

const getDailyWeatherData = createSelector(
  getWeatherData,
  weatherData => weatherData && weatherData.daily
)

const getFormattedDailyWeatherData = createSelector(
  getDailyWeatherData,
  weatherData => {
    if (!weatherData) return null;
    return weatherData.map(day => {
      return {
        ...day,
        dt:`${DAYS_OF_THE_WEEK[getDay(new Date(day.dt * 1000))]} ${format(new Date(day.dt * 1000), 'MM/dd/yyyy')}` ,
        temp: {
          ...day.temp,
          day: kelvinToFahrenheit(day.temp.day)
        }
      }
    })
  }

)

export const ProfileSiteAppStateQuery = {
  getProjects,
  getWeatherData,
  getFormattedDailyWeatherData
}
