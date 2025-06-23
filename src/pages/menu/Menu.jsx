import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../../Components/Header/Header";
import Temp from '../../assets/public/temperatura.jpg';
import Cardiac from '../../assets/public/ritmo-cardiaco.jpg';
import Oxige from '../../assets/public/oxigeno.jpg';
import Estres from '../../assets/public/estres.jpg';  
import Orina from '../../assets/public/orina.jpg';
import Azucar from '../../assets/public/azucar.jpg';
import './Menu.css';

const menuItems = [
  {
    label: 'Temperatura corporal',
    image: Temp,
    route: '/temperatura',
  },
  {
    label: 'Ritmo cardíaco',
    image:  Cardiac,
    route: '/ritmo-cardiaco',
  },
  {
    label: 'Saturación de oxígeno (SpO₂)',
    image:  Oxige,
    route: '/oxigeno',
  },
  {
    label: 'Nivel de estrés',
    image:  Estres,
    route: '/estres',
  },
  {
    label: 'Orina o Ph',
    image:  Orina,
    route: '/orina',
  },
  {
    label: 'Azúcar en la orina',
    image:  Azucar,
    route: '/azucar',
  },
];

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div className="menu-container">
    <Header />
      <h2>Menú</h2>
      <div className="menu-grid">
        {menuItems.map((item) => (
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
  );
};

export default Menu;