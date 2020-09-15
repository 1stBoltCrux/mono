import { createReducer, on, Action } from '@ngrx/store';
import * as AppActions from './app.actions';
import { AppState } from './app.models';

export const initialState = {
  loaded: false
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
  on(AppActions.fetchNoaaData, (state) => ({ ...state, noaaDataloaded: false, error: null })),
  on(AppActions.fetchNoaaDataSuccess, (state, { noaaData }) => ({
    ...state,
    noaaData
  })
  ),
  on(AppActions.fetchNoaaDataFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: AppState | undefined, action: Action) {
  return appReducer(state, action);
}
