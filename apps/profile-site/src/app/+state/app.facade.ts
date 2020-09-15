import { Injectable } from '@angular/core';

import {Store} from '@ngrx/store';
import { loadApp, fetchNoaaData } from './app.actions';
import * as fromApp from './app.reducer';
import * as AppSelectors from './app.selectors';
import { AppState } from './app.models';

@Injectable()
export class AppFacade {

  projects$ = this.store.select(AppSelectors.ProfileSiteAppStateQuery.getProjects)
  noaaData$ = this.store.select(AppSelectors.ProfileSiteAppStateQuery.getNoaaData)
  loadApp() {
    this.store.dispatch(loadApp());
  }

  fetchNoaaData() {
    this.store.dispatch(fetchNoaaData());
  }

  constructor(private store: Store<AppState>) {
  }
}
