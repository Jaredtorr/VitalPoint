import React from "react";
import "./Login.css";
import Header from "../../Components/Header/Header";

const Login = () => {
  return (
    <div>
      <Header />
      <div className="login-container">
        <div className="login-form-container">
        <h1>Login</h1>
        <form className="login-form">
          <label htmlFor="userName">User Name:</label>
          <input type="text" id="userName" name="userName" required />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" required />

          <button type="submit">Login</button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
