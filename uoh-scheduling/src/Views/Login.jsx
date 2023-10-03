import React, { useContext } from "react";
import "../css/LoginForm.css";
import AuthContext from "../AuthContext";

const Login = () => {
  
  //let {loginUser} = useContext(AuthContext)
  return (
    <div id="login-form">
      <h1>Login</h1>
      <form>
        <label htmlFor="username">email:</label>
        <input type="text" id="username" name="username" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Login;
