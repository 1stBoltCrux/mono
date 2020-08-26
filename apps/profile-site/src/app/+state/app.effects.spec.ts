import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { AppEffects } from './app.effects';
import * as AppActions from './app.actions';

describe('AppEffects', () => {
  let actions: Observable<any>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        AppEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(AppEffects);
  });

  describe('loadApp$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AppActions.loadApp() });

      const expected = hot('-a-|', {
        a: AppActions.loadAppSuccess({ app: [] }),
      });

      expect(effects.loadApp$).toBeObservable(expected);
    });
  });
});
