import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import './Header.css';

// Opciones base del menú
const baseMenuOptions = [
  { label: "Menú", path: "/Menu" },
  { label: "Temperatura corporal", path: "/BodyTemperature" },
  { label: "Saturación de oxígeno (SpO₂)", path: "/OxigenoSangre" },
  { label: "Nivel de estrés", path: "/stress" },
  { label: "Orina o pH", path: "/phOrina" },
  { label: "Azúcar en la orina", path: "/SugarOrine" },
  // Añadimos las opciones de admin directamente aquí
  { label: "Estadísticas", path: "/estadisticas" },
  { label: "Crear Usuario", path: "/crear-usuario" },
];

function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    
    // Oculta el menú en login y menú principal
    const hideMenu = ["/", "/Menu"].includes(location.pathname);
    
    // Usamos directamente baseMenuOptions que ya incluye todo
    const menuOptions = [...baseMenuOptions, { label: "Cerrar sesión", path: "/" }];

    const handleNavigate = (path) => {
      setOpen(false);
      navigate(path);
    };

    return (
        <header className="navbar">
            <div className="left-section">
                <img src="logo.png" alt="logo" className="logo" />
            </div>
            <h1 className="title-navbar">InnovaTech</h1>
            {/* Botón hamburguesa solo si corresponde */}
            {!hideMenu && (
                <div className="header-menu-wrapper">
                    <button
                        className="header-menu-btn"
                        onClick={() => setOpen(!open)}
                        aria-label="Abrir menú"
                    >
                        &#9776;
                    </button>
                    {open && (
                        <nav className="header-menu-dropdown">
                            <ul>
                                {menuOptions.map(opt => (
                                    <li key={opt.path}>
                                        <button 
                                            onClick={() => handleNavigate(opt.path)}
                                        >
                                            {opt.label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    )}
                </div>
            )}
        </header>
    );
}

export default Header;