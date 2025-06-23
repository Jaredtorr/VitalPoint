import Cardiac from './pages/Cardiac/Cardiac'
import { Routes, Route } from 'react-router-dom';
import Stress from './pages/Stress/Stress'
import Menu from  './pages/menu/menu'
import OxigenoSangre from './pages/oxigeno-sangre/OxigenoSangre'
import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} /> 
    <Route path='/Menu' element = {<Menu/>} />
   </Routes>
  )
}

export default App;
