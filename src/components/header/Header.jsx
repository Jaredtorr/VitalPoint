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
];

// Opciones para administradores
const adminOptions = [
  { label: "Estadísticas", path: "/estadisticas" },
  { label: "Crear Usuario", path: "/crear-usuario" },
];

function Header() {
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();

    // Oculta el menú en login y menú principal
    const hideMenu = ["/", "/Menu"].includes(location.pathname);

    // Añade un console.log para verificar el rol del usuario
    console.log('Usuario actual:', user);

    const isAdmin = user?.role === 'admin';
    
    // Modifica cómo se combinan las opciones del menú
    const menuOptions = React.useMemo(() => {
        const options = [...baseMenuOptions];
        
        if (isAdmin) {
            options.push(...adminOptions);
        }
        
        options.push({ label: "Cerrar sesión", path: "/" });
        
        return options;
    }, [isAdmin]);

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
                                        <button 
                                            onClick={() => handleNavigate(opt.path)}
                                            className={opt.label === 'Estadísticas' || opt.label === 'Crear Usuario' ? 'admin-option' : ''}
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