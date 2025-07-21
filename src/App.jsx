import Cardiac from './pages/Cardiac/Cardiac'
import { Routes, Route } from 'react-router-dom';
import Stress from './pages/Stress/Stress'
import './App.css'
import SugarOrine from './pages/SugarOrine/SugarOrine';

function App() {
  return (
   <Routes>
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} /> 
    <Route path='/SugarOrine'  element = {<SugarOrine/>} /> 
   </Routes>
  )
}

export default App;
