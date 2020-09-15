import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { noaaUrl } from './app.constants';
import * as AppActions from './app.actions';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map, tap } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  loadApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.loadApp),
      fetch({
        run: () => 
          this.http
            .get(environment.dataPath + environment.stateJSON)
            .pipe(
              tap(thing => console.log(thing)),
              map((payload: any) => AppActions.loadAppSuccess({app: payload}))
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return AppActions.loadAppFailure({ error });
        },
      })
    )
  );

  fetchNoaaData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.fetchNoaaData),
      fetch({
        run: () => 
          this.http
            .get(noaaUrl)
            .pipe(
              tap(thing => console.log(thing)),
              map((payload: any) => AppActions.fetchNoaaDataSuccess({noaaData: payload}))
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return AppActions.fetchNoaaDataFailure({ error });
        },
      })
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}
