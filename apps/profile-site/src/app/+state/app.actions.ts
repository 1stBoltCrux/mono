import { createAction, props } from '@ngrx/store';
import { AppState } from './app.models';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction(
  '[Profile Site] Load App Success',
  props<{ app: AppState }>()
);

export const loadAppFailure = createAction(
  '[Profile Site] Load App Failure',
  props<{ error: any }>()
);

export const fetchWeatherData = createAction(
  '[Profile Site] Fetch Weather Data',
);

export const fetchWeatherDataSuccess = createAction(
  '[Profile Site] Fetch Weather Data Success',
  props<{ weatherData: any }>()
);

export const fetchWeatherDataFailure = createAction(
  '[Profile Site] Fetch Weather Data Failure',
  props<{ error: any }>()
);

export const loadWeatherDataFromLocalStorage = createAction(
  '[Profile Site] Load Weather Data From Local Storage'
)

export const loadWeatherDataFromLocalStorageSuccess = createAction(
  '[Profile Site] Load Weather Data From Local Storage Success',
  props<{ weatherData: any }>()
)

export const loadWeatherDataFromLocalStorageFailure = createAction(
  '[Profile Site] Load Weather Data From Local Storage Failure',
  props<{ error: any }>()
)
