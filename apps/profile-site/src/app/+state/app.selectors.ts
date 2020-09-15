import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, NoaaData } from './app.models';
import { Project } from './app.models';

const getAppState = createFeatureSelector<AppState>('app');

const getProjects = createSelector(
  getAppState,
  state => state && state.projects
)

const getNoaaData = createSelector(
  getAppState,
  state => state && state.noaaData
)

export const ProfileSiteAppStateQuery = {
  getProjects,
  getNoaaData
}
