import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Header.css'

const menuOptions = [
  { label: "Menú", path: "/Menu" },
  { label: "Temperatura corporal", path: "/BodyTemperature" },
  { label: "Ritmo cardíaco", path: "/cardiac" },
  { label: "Saturación de oxígeno (SpO₂)", path: "/OxigenoSangre" },
  { label: "Nivel de estrés", path: "/stress" },
  { label: "Orina o pH", path: "/phOrina" },
  { label: "Azúcar en la orina", path: "/azucar" },
  { label: "Cerrar sesión", path: "/" } // Ruta de cierre de sesión
];

function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Oculta el menú en login y menú principal
    const hideMenu = ["/", "/Menu"].includes(location.pathname);

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
                <div style={{ position: "absolute", right: 30, top: 30 }}>
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
                                        <button onClick={() => handleNavigate(opt.path)}>
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
    )
}

export default Header;