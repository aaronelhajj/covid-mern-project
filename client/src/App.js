import logo from './logo.svg';
import './App.css';
import AllCountries from './components/AllCountries';
import AddCountry from './components/AddCountry';
import UpdateCountry from './components/UpdateCountry';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import LogReg from './views/LogReg';
import Profile from './components/Profile';
import ViewCountry from './components/ViewCountry';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<LogReg />} path='/' />
          <Route element={<AllCountries />} path='/all/countries' />
          <Route element={<AddCountry />} path='/add/country/:name' />
          <Route element={<Profile />} path='/user/profile/:username' />
          <Route element={<UpdateCountry />} path='/update/country/:name/:id' />
          <Route element={<ViewCountry />} path='/view/country/:name/:id' />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
