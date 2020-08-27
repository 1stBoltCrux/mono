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
