// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

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

const reducer = (state = initialState, action: Action): RootState => {
  switch (action.type) {
    case 'SET_SERVER_URL':
      return { ...state, serverUrl: action.payload };
    default:
      return state;
  }
};

const persistConfig: PersistConfig<RootState> = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export { store, persistor };
