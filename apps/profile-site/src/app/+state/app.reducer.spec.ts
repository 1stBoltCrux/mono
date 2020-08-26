import { AppEntity } from './app.models';
import * as AppActions from './app.actions';
import { State, initialState, reducer } from './app.reducer';

describe('App Reducer', () => {
  const createAppEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppEntity);

  beforeEach(() => {});

  describe('valid App actions', () => {
    it('loadAppSuccess should return set the list of known App', () => {
      const app = [
        createAppEntity('PRODUCT-AAA'),
        createAppEntity('PRODUCT-zzz'),
      ];
      const action = AppActions.loadAppSuccess({ app });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
