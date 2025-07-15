import React, { useState } from "react";
import FormGroup from "../molecules/FormGroup";
import Button from "../atoms/Button";

const fields = [
  { label: "Nombre", name: "nombre", type: "text", required: true },
  { label: "Correo electrónico", name: "email", type: "email", required: true },
  { label: "Contraseña", name: "password", type: "password", required: true },
  { label: "Confirmar contraseña", name: "confirmPassword", type: "password", required: true }
];

const RegisterForm = ({ onSubmit }) => {
  const [values, setValues] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (values.password !== values.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 350, margin: "0 auto" }}>
      <FormGroup fields={fields} values={values} onChange={handleChange} />
      {error && <div style={{ color: "#d32f2f", marginBottom: 8 }}>{error}</div>}
      <Button type="submit">Registrarse</Button>
    </form>
  );
};

export default RegisterForm;