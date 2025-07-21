import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../../components/header/Header";
import Button from "../../components/atoms/Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Aquí iría tu lógica de autenticación
    // Si el login es exitoso:
    navigate("/Menu"); // Cambia "/menu" por la ruta de tu menú principal
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nombre de Usuario"
            required
          />

          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
          />

          <Button type="submit">Iniciar sesión</Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
