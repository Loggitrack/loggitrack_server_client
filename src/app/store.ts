// store.ts
import { configureStore, combineReducers, createStore } from '@reduxjs/toolkit'; 


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


const store = createStore(reducer);



export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export { store };
