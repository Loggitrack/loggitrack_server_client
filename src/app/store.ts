// store.ts
import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'; 
import serverUrlReducer from './serverUrlSlice';

type RootState = {
  serverUrl: string | null;
};

const initialState: RootState = {
  serverUrl: null,
};

type Action = {
  type: 'SET_SERVER_URL';
  payload: string;
};




 export const store = configureStore({
  reducer: {
    // add your reducers here
    serverUrl: serverUrlReducer,
  },
});



export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

