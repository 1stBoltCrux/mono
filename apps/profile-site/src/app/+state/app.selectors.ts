import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app.models';
import { Project } from './app.models';

const getAppState = createFeatureSelector<AppState>('app');

const getProjects = createSelector(
  getAppState,
  state => state && state.projects
)

export const ProfileSiteAppStateQuery = {
  getProjects
}