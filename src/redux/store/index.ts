import { configureStore, ThunkDispatch } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

import { persistStore } from 'redux-persist';

export const store = configureStore({ reducer: rootReducer, middleware: [thunk] })
export const persistor = persistStore(store);
export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppState, undefined, any>
store.subscribe(() => {
    const state = store.getState().portfolio;
    localStorage.setItem('portfolio', JSON.stringify(state));
});