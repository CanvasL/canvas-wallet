import './App.scss';
import {Header} from './layouts';
import GetRoutes from './router/GetRoutes';

const App = () => {
  return (
      <div className='App'>
        <Header />
        <GetRoutes />
      </div>
  );
}

export default App;
