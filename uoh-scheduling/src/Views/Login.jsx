import React, { useContext, useState } from "react";
import "../css/LoginForm.css";
import AuthContext from "../AuthContext";
const Login = () => {
  let {loginUser} = useContext(AuthContext)
  //let {loginUser} = useContext(AuthContext)
  return (
    <div id="login-form">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        <label htmlFor="email">email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
