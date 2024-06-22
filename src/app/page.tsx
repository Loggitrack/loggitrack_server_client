import Main from "./(main)/page";
import Login from "./auth/page";
import GetHostComponent from "@components/GetHostComponent";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

export default function Home() {
  const isAuth = false;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {<Login />}
      {/* <GetHostComponent /> */}
    </main>
      </PersistGate>
    </Provider>
    
  );
}
