import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppFacade } from 'apps/profile-site/src/app/+state/app.facade';
import { ResizeService } from '@mono/shared';
import { Subscription } from 'rxjs';
import {add, isAfter } from 'date-fns'
import { weatherDataRefreshTime } from 'apps/profile-site/src/app/+state/app.constants'

@Component({
  selector: 'mono-scratch',
  templateUrl: './scratch.component.html',
  styleUrls: ['./scratch.component.scss']
})
export class ScratchComponent implements OnInit, OnDestroy {
  weatherData$ = this.facade.formattedDailyWeatherData$;
  windowWidthSubscription$: Subscription;
  windowWidth;
  constructor(private facade: AppFacade, private resizeService: ResizeService ) { }

  ngOnInit(): void {
    this.windowWidthSubscription$ = this.resizeService.resize$.subscribe(windowWidth => this.windowWidth = windowWidth);

    // check to see if weatherData is over the refresh time limit

    const localStorageWeatherData = JSON.parse(localStorage.getItem('weatherData'));
    const localStorageWeatherDataTimeStamp = localStorageWeatherData && localStorageWeatherData.timeStamp;

    const now = new Date();
    const sixHoursPassed = add(new Date(localStorageWeatherDataTimeStamp), { hours: weatherDataRefreshTime })
    const refreshData = isAfter(now, sixHoursPassed);


    if (localStorageWeatherData && !refreshData) {
      this.facade.loadWeatherDataFromLocalStorage();
    } else {
      this.facade.fetchWeatherData();
    }
  }

  ngOnDestroy(): void {
    this.windowWidthSubscription$.unsubscribe();
  }

}
