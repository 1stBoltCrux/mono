import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import * as fromApp from './+state/app.reducer';
import { AppEffects } from './+state/app.effects';
import { AppFacade } from './+state/app.facade';
import { routerReducer, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ProfileSiteLibModule } from '@mono/profile-site-lib';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule,
    ProfileSiteLibModule,
    StoreModule.forRoot(
      {
        app: fromApp.reducer,
        router: routerReducer
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([AppEffects]),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature(fromApp.APP_FEATURE_KEY, fromApp.reducer),
  ],
  providers: [AppFacade],
  bootstrap: [AppComponent],
})
export class AppModule {}
