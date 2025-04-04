import { Outlet } from 'react-router';
import Header from '../components/Header';
import './App.module.scss';
import '@/config/mobx/configureMobX';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
