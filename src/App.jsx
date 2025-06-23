import Cardiac from './pages/Cardiac/Cardiac'
import { Routes, Route } from 'react-router-dom';
import Stress from './pages/Stress/Stress'
import Login from './pages/login/Login'
import './App.css'

function App() {
  return (
   <Routes>
    <Route path='/' element = {<Login />} />
    <Route path='/cardiac' element = {<Cardiac/>} />
    <Route path='/stress'  element = {<Stress/>} /> 
   </Routes>
  )
}

export default App;
