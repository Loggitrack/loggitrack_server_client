// store.ts
import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'; 
import serverUrlReducer from './serverUrlSlice';
import storage from 'redux-persist/lib/storage'; // Use localStorage as storage
import { persistReducer, persistStore } from 'redux-persist'; 


const persistConfig = {
  key: 'root', // Key for storage
  storage,    // Use localStorage
};

const persistedReducer = persistReducer(persistConfig, serverUrlReducer);


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
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false, // Disable check for non-serializable data
      }),
});

export const persistor = persistStore(store); // Create persistor object



export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;

