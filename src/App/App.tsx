import { Outlet } from 'react-router';
import Header from '../components/Header';

import './App.module.scss';

function App() {
  return (
    <div className="app">
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
