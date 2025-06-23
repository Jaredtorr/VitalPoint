import Cardiac from './pages/Cardiac/Cardiac';
import { Routes, Route } from 'react-router-dom';
import TemperaturaCorporal from './pages/BodyTemperature/TemperaturaCorporal';
import PhOrina from './pages/phOrina/PhOrina';
import Stress from './pages/Stress/Stress';
import Menu from  './pages/menu/menu';
import OxigenoSangre from './pages/oxigeno-sangre/OxigenoSangre';
import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} />
    <Route path='/BodyTemperature' element = {<TemperaturaCorporal/>}/>
    <Route path='/phOrina' element = {<PhOrina/>}/>
    <Route path='/Menu' element = {<Menu/>} />
    <Route path='/OxigenoSangre' element = {<OxigenoSangre/>} />
   </Routes>
  )
}

export default App;
