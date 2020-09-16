import { createReducer, on, Action } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppState } from './app.models';

export const initialState = {
  loaded: false,
  error: null,
  weatherData: null,
}

const appReducer = createReducer(
  initialState,
  on(AppActions.loadApp, (state) => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadAppSuccess, (state, { app }) => ({
    ...state,
    ...app
  })
  ),
  on(AppActions.loadAppFailure, (state, { error }) => ({ ...state, error })),
  on(AppActions.fetchWeatherData, (state) => ({ ...state, weatherDataLoaded: false, error: null })),
  on(AppActions.fetchWeatherDataSuccess, (state, { weatherData }) => ({
    ...state,
    weatherData
  })
  ),
  on(AppActions.fetchWeatherDataFailure, (state, { error }) => ({ ...state, error })),
  on(AppActions.loadWeatherDataFromLocalStorage, (state) => ({ ...state, weatherDataLoaded: false, error: null })),
  on(AppActions.loadWeatherDataFromLocalStorageSuccess, (state, { weatherData }) => ({ ...state, weatherData })),
  on(AppActions.loadWeatherDataFromLocalStorageFailure, (state, { error }) => ({ ...state, error })),
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
