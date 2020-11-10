import React from "react";

import AuthForm from "../../components/auth-form/auth-form.component";
import "./login.styles.scss";
import Cover from "../../assets/Capture.PNG";

function Login() {
  return (
    <div className="login-container">
      <div className='bg-cover'>
        <img src={Cover} alt="cover" />
      </div>
      <div className='form-holder'>
        <p className='title'>Login</p>
        <AuthForm authMode="login" />
      </div>
    </div>
  );
}

export default Login;
