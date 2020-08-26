import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as AppActions from './app.actions';
import { AppEntity } from './app.models';

export const APP_FEATURE_KEY = 'app';

export interface State extends EntityState<AppEntity> {
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: string | null; // last known error (if any)
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: State;
}

export const appAdapter: EntityAdapter<AppEntity> = createEntityAdapter<
  AppEntity
>();

export const initialState: State = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const appReducer = createReducer(
  initialState,
  on(AppActions.loadApp, (state) => ({ ...state, loaded: false, error: null })),
  on(AppActions.loadAppSuccess, (state, { app }) => ({
    ...state,
    ...app
  })
  ),
  on(AppActions.loadAppFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}
