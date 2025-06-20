import Cardiac from './pages/Cardiac/Cardiac'
import { Routes, Route } from 'react-router-dom';
import Stress from './pages/Stress/Stress'
import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} /> 
   </Routes>
  )
}

export default App;
