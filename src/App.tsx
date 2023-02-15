import './App.scss';
import { Routes, Route } from 'react-router-dom';
import {Header} from './layouts';
import { Dashboard, Transactions, Settings } from './pages';

const App = () => {
  return (
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/transactions' element={<Transactions />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
  );
}

export default App;
