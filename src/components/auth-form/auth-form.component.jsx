import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { auth, createUserProfileDocument } from "../../firebase/firebase.utils";

import "./auth-form.styles.scss";

function AuthForm({ authMode, history, ...props }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const submitForm = (e) => {
    e.preventDefault();

    if (authMode === "signup") {
      console.log("Signed up");

      auth.createUserWithEmailAndPassword(email, password).then((user) => {
        createUserProfileDocument(user)
          .then(() => {
            history.push("/");
          })
          .catch((err) => {
            console.log("Error while creating user", err);
          })
          .catch((error) => {
            console.log("Error while creating user", error);
          });
      });
      return;
    } 
    
    if (authMode === 'login'){
      console.log("Logged in");

      auth
        .signInWithEmailAndPassword(email, password)
        .then(history.push("/"))
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={(e) => submitForm(e)}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {authMode === "signup" && (
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        )}
        <input
          type="submit"
          className="submit-btn"
          value={authMode === "signup" ? "SIGN UP" : "LOG IN"}
        />
      </form>
      {error && <p>{error}</p>}
      {authMode === "signup" ? (
        <div>
          Already have an account? <NavLink to="login" className='nav-links'>Sign in</NavLink>
        </div>
      ) : (
        <div>
          Don't have an account? <NavLink to="signup" className='nav-links'>Sign up</NavLink>
        </div>
      )}
    </div>
  );
}

export default withRouter(AuthForm);
