import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import Temp from '../../assets/public/temperatura.jpg';
import Oxige from '../../assets/public/oxigeno.jpg';
import Estres from '../../assets/public/estres.jpg';  
import Orina from '../../assets/public/orina.jpg';
import Azucar from '../../assets/public/azucar.jpg';
import './Menu.css';

const menuItems = [
  {
    label: 'Temperatura corporal',
    image: Temp,
    route: '/BodyTemperature',
  },
  {
    label: 'Saturación de oxígeno (SpO₂)',
    image: Oxige,
    route: '/OxigenoSangre',
  },
  {
    label: 'Nivel de estrés',
    image: Estres,
    route: '/stress',
  },
  {
    label: 'Orina o Ph',
    image: Orina,
    route: '/phOrina',
  },
  {
    label: 'Azúcar en la orina',
    image: Azucar,
    route: '/SugarOrine',
  },
];

function Menu() {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
      <Header />
      <h2>Menú</h2>
      <div className="menu-grid">
        <div className="menu-row">
          {menuItems.slice(0, 3).map((item) => (
            <button
              key={item.label}
              className="menu-card"
              onClick={() => navigate(item.route)}
            >
              <img src={item.image} alt={item.label} className="menu-image" />
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
        <div className="menu-row">
          {menuItems.slice(3).map((item) => (
            <button
              key={item.label}
              className="menu-card"
              onClick={() => navigate(item.route)}
            >
              <img src={item.image} alt={item.label} className="menu-image" />
              <span className="menu-label">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Menu;
