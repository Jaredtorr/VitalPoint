import React from "react";
import Header from "../../components/header/Header";
import RegisterForm from "../../components/organisms/RegisterForm";

const Registro = () => {
  const handleRegister = (data) => {
    // Aquí puedes hacer la petición a tu API para registrar el usuario
    alert("Registro enviado:\n" + JSON.stringify(data, null, 2));
  };

  return (
    <div style={{ background: "#dedede", minHeight: "100vh" }}>
      <Header />
      <h1 style={{ textAlign: "center", marginTop: 40 }}>Registro de Usuario</h1>
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
};

export default Registro;