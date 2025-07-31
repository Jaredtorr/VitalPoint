import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Header from "../../Components/Header/Header";
import Button from "../../components/atoms/Button";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const success = await login(userName, password);
      if (success) {
        navigate("/Menu");
      } else {
        setError("Credenciales inválidas");
      }
    } catch (error) {
      setError("Error al intentar iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <Header />
      <div className="login-form-container">
        <h1>Login</h1>
        {error && <div className="error-message">{error}</div>}
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="userName">User Name:</label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
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
