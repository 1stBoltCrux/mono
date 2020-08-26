import { Injectable } from '@angular/core';

import { select, Store, Action } from '@ngrx/store';

import * as fromApp from './app.reducer';
import * as AppSelectors from './app.selectors';

@Injectable()
export class AppFacade {
  loaded$ = this.store.pipe(select(AppSelectors.getAppLoaded));
  allApp$ = this.store.pipe(select(AppSelectors.getAllApp));
  selectedApp$ = this.store.pipe(select(AppSelectors.getSelected));

  constructor(private store: Store<fromApp.AppPartialState>) {}

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
