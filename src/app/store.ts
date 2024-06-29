import { configureStore } from '@reduxjs/toolkit'; 
import serverUrlReducer from './serverUrlSlice';

export const store = configureStore({
  reducer: {
    serverUrl: serverUrlReducer, // Your reducer
  },
});

// Infer types from the store itself
export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
