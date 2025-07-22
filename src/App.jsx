import Cardiac from './pages/Cardiac/Cardiac';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login'
import TemperaturaCorporal from './pages/BodyTemperature/TemperaturaCorporal';
import PhOrina from './pages/phOrina/PhOrina';
import Stress from './pages/Stress/Stress';
import Menu from  './pages/menu/menu';
import OxigenoSangre from './pages/oxigeno-sangre/OxigenoSangre';
import './App.css'
import SugarOrine from './pages/SugarOrine/SugarOrine';

function App() {
  return (
   <Routes>
    <Route path='/' element = {<Login />} />
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/SugarOrine'  element = {<SugarOrine/>} /> 
    <Route path='/stress'  element = {<Stress/>} />
    <Route path='/BodyTemperature' element = {<TemperaturaCorporal/>}/>
    <Route path='/phOrina' element = {<PhOrina/>}/>
    <Route path='/Menu' element = {<Menu/>} />
    <Route path='/OxigenoSangre' element = {<OxigenoSangre/>} />
   </Routes>
  )
}

export default App;
