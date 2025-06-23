import Cardiac from './pages/Cardiac/Cardiac'
import { Routes, Route } from 'react-router-dom';
import Stress from './pages/Stress/Stress'
import TemperaturaCorporal from './pages/BodyTemperature/TemperaturaCorporal';
import PhOrina from './pages/phOrina/PhOrina';
import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} /> 
    <Route path='/BodyTemperature' element = {<TemperaturaCorporal/>}/>
     <Route path='/phOrina' element = {<PhOrina/>}/>
   </Routes>
  )
}

export default App;
