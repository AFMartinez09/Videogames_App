import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navBar/NavBar';
import Form from './Form/Form';
import HomePage from './HomePage/HomePage';
import Detail from './detail/Detail';
import LandingPage from './LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={'*'} element={<NavBar />} />
        <Route exact path={'/'} element= {< LandingPage />} />
        <Route path={'/form'} element={<Form />} />
        <Route path={'/home'} element={<HomePage />} />
        <Route path={'/details/:id'} element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
