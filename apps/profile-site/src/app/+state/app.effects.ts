import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { OPEN_WEATHER_URL } from './app.constants';
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
              map((payload: any) => AppActions.loadAppSuccess({app: payload}))
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return AppActions.loadAppFailure({ error });
        },
      })
    )
  );

  fetchWeatherData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.fetchWeatherData),
      fetch({
        run: () => 
          this.http
            .get(`${OPEN_WEATHER_URL}${environment.OPEN_WEATHER_API_KEY}`)
            .pipe(
              map((payload: any) => AppActions.fetchWeatherDataSuccess({weatherData: payload}))
            ),
        onError: (action, error) => {
          console.error('Error', error);
          return AppActions.fetchWeatherDataFailure({ error });
        },
      })
    )
  );

  fetchWeatherDataSuccess$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.fetchWeatherDataSuccess),
      tap(({ weatherData }) => {
        const weatherDataWithTimeStamp = { ...weatherData, timeStamp: new Date()}
        localStorage.setItem('weatherData', JSON.stringify(weatherDataWithTimeStamp));
      })
    ),
    {dispatch: false}
  )

  loadWeatherDataFromLocalStorage$ = createEffect(() => 
    this.actions$.pipe(
      ofType(AppActions.loadWeatherDataFromLocalStorage),
      map(() => {
        const localStorageWeatherData = JSON.parse(localStorage.getItem('weatherData'));
        return AppActions.loadWeatherDataFromLocalStorageSuccess({ weatherData: localStorageWeatherData });
      })
    )
  )

  constructor(private actions$: Actions, private http: HttpClient) {}
}
