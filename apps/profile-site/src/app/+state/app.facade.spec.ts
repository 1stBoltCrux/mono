import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { AppEntity } from './app.models';
import { AppEffects } from './app.effects';
import { AppFacade } from './app.facade';

import * as AppSelectors from './app.selectors';
import * as AppActions from './app.actions';
import { APP_FEATURE_KEY, State, initialState, reducer } from './app.reducer';

interface TestSchema {
  app: State;
}

describe('AppFacade', () => {
  let facade: AppFacade;
  let store: Store<TestSchema>;
  const createAppEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(APP_FEATURE_KEY, reducer),
          EffectsModule.forFeature([AppEffects]),
        ],
        providers: [AppFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(AppFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allApp$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(AppActions.loadApp());

        list = await readFirst(facade.allApp$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadAppSuccess` to manually update list
     */
    it('allApp$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allApp$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          AppActions.loadAppSuccess({
            app: [createAppEntity('AAA'), createAppEntity('BBB')],
          })
        );

        list = await readFirst(facade.allApp$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
