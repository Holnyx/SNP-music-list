import { combineReducers, legacy_createStore } from 'redux';
import musicReducer from './musicReducer';

const rootReducer = combineReducers({
  musicList: musicReducer,
});

export const store = legacy_createStore(rootReducer);
export type AppRootStateItems = ReturnType<typeof rootReducer>;

export default store;
