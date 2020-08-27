import { Injectable } from '@angular/core';

import {Store} from '@ngrx/store';
import { loadApp } from './app.actions';
import * as fromApp from './app.reducer';
import * as AppSelectors from './app.selectors';
import { AppState } from './app.models';

@Injectable()
export class AppFacade {

  projects$ = this.store.select(AppSelectors.ProfileSiteAppStateQuery.getProjects)
  
  loadApp() {
    this.store.dispatch(loadApp());
  }
  constructor(private store: Store<AppState>) {
    console.log(fromApp)
  }
}
