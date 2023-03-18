import { configureStore, ThunkDispatch } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/rootReducer'

export const store = configureStore({ reducer: rootReducer, middleware: [thunk] })

export type AppState = ReturnType<typeof rootReducer>
export type AppDispatch = ThunkDispatch<AppState, undefined, any>
