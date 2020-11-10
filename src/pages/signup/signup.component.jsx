import React from "react";

import "./signup.styles.scss";
import AuthForm from "../../components/auth-form/auth-form.component";
import Cover from "../../assets/Capture.PNG";

function SignUp() {
  return (
    <div className="signup-container">
      <div className='bg-cover'>
        <img src={Cover} alt="cover" />
      </div>
      <div className="form-holder">
        <p className="title">Sign Up</p>
        <AuthForm authMode="signup" />
      </div>
    </div>
  );
}

export default SignUp;
