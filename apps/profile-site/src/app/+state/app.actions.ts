import { createAction, props } from '@ngrx/store';
import { AppState } from './app.models';

export const loadApp = createAction('[App] Load App');

export const loadAppSuccess = createAction(
  '[App] Load App Success',
  props<{ app: AppState }>()
);

export const loadAppFailure = createAction(
  '[App] Load App Failure',
  props<{ error: any }>()
);

export const fetchNoaaData = createAction(
  '[App] Fetch NOAA Data',
);

export const fetchNoaaDataSuccess = createAction(
  '[App] Fetch NOAA Data Success',
  props<{ noaaData: any }>()
);

export const fetchNoaaDataFailure = createAction(
  '[App] Fetch NOAA Data Failure',
  props<{ error: any }>()
);
