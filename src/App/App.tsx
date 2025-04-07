import { Outlet } from 'react-router';
import { useQueryParamsStoreInit } from '@/store/RootStore/hooks/useQueryParamsStoreInit';
import Header from '../components/Header';
import './App.module.scss';
import '@/config/mobx/configureMobX';

function App() {
  useQueryParamsStoreInit();
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
