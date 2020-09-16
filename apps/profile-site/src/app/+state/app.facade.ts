import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import {
  loadApp,
  fetchWeatherData,
  loadWeatherDataFromLocalStorage,
} from './app.actions';
import * as AppSelectors from './app.selectors';
import { AppState } from './app.models';

@Injectable()
export class AppFacade {
  projects$ = this.store.select(
    AppSelectors.ProfileSiteAppStateQuery.getProjects
  );
  weatherData$ = this.store.select(
    AppSelectors.ProfileSiteAppStateQuery.getNoaaData
  );
  loadApp() {
    this.store.dispatch(loadApp());
  }

  fetchWeatherData() {
    this.store.dispatch(fetchWeatherData());
  }

  loadWeatherDataFromLocalStorage() {
    this.store.dispatch(loadWeatherDataFromLocalStorage());
  }

  constructor(private store: Store<AppState>) {}
}
