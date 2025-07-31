import Cardiac from './pages/Cardiac/Cardiac';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login/Login'
import TemperaturaCorporal from './pages/BodyTemperature/TemperaturaCorporal';
import PhOrina from './pages/phOrina/PhOrina';
import Stress from './pages/Stress/Stress';
import Menu from './pages/menu/Menu';
import OxigenoSangre from './pages/Oxigeno-sangre/OxigenoSangre';
import './App.css'
import SugarOrine from './pages/SugarOrine/SugarOrine';
import Estadisticas from './pages/estadisticas/Estadisticas';
import CreateUser from './pages/createUser/CreateUser';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/cardiac' element={
          <ProtectedRoute>
            <Cardiac/>
          </ProtectedRoute>
        } />
        <Route path='/SugarOrine' element={
          <ProtectedRoute>
            <SugarOrine/>
          </ProtectedRoute>
        } /> 
        <Route path='/stress' element={
          <ProtectedRoute>
            <Stress/>
          </ProtectedRoute>
        } />
        <Route path='/BodyTemperature' element={
          <ProtectedRoute>
            <TemperaturaCorporal/>
          </ProtectedRoute>
        }/>
        <Route path='/phOrina' element={
          <ProtectedRoute>
            <PhOrina/>
          </ProtectedRoute>
        }/>
        <Route path='/Menu' element={
          <ProtectedRoute>
            <Menu/>
          </ProtectedRoute>
        } />
        <Route path='/OxigenoSangre' element={
          <ProtectedRoute>
            <OxigenoSangre/>
          </ProtectedRoute>
        } />
        <Route path='/estadisticas' element={
          <ProtectedRoute>
            <Estadisticas/>
          </ProtectedRoute>
        } />
        <Route path='/crear-usuario' element={
          <ProtectedRoute>
            <CreateUser />
          </ProtectedRoute>
        } />
      </Routes>
    </AuthProvider>
  );
}

export default App;
