import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import ProgressPage from "../ProgressPage/ProgressPage";
import "./SignIn.css";
import Button from "../Button/Button";
import SignUp from "../SignUp/SignUp"

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { signIn } = UserAuth();
  const [signinPopup, setSigninPopup] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/ProgressPage");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="signin-container">
      {signinPopup?(<div className="signin-element"><div className="closing-button-container">
        <button onClick={props.displayButtonClick}>X</button>
      </div>
      <div className="signin-container-header">
        <h1>Sign in to your account</h1>
        <p>
          Don't have an account yet?
          <button onClick={()=>{setSigninPopup(!signinPopup)}}>Sign Up</button>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="signin-container-main">
          <label>Email Address</label>
          <input onChange={(e) => setEmail(e.target.value)} type="email" />
          <label>Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
        </div>
        <div className="signin-container-footer">
          <button>Sign In</button>
        </div>
      </form></div>):<SignUp signInButton={()=>{setSigninPopup(!signinPopup)}}/>}
      
    </div>
  );
};

export default SignIn;
