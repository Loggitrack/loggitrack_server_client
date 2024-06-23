'use client';
import Login from "./auth/page";
import GetHostComponent from "@components/GetHostComponent";
import { Provider } from 'react-redux';
import { store } from './store';

export default function Home() {
 
  return (
    <Provider store={store}>
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          {<Login />}
          {/* <GetHostComponent /> */}
        </main>
    </Provider>
    
  );
}
