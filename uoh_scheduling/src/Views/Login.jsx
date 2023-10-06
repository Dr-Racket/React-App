import React, { useContext, useState } from "react";
import "../css/LoginForm.css";
import AuthContext from "../AuthContext";
const Login = () => {
  let {loginUser} = useContext(AuthContext)
  //let {loginUser} = useContext(AuthContext)
  return (
    <div className="login-form">
      <h1>Iniciar Sesión</h1>
      <form onSubmit={loginUser}>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="text" className="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" className="password" name="password" />
        </div>
        <input className="login-button" type="submit" value="Enviar"/>
      </form>
    </div>
  );
};

export default Login;
