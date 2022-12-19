import React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "../Button/Button";
import { DarkModeContext } from "../DarkModeContext.js";
import ProgressPage from "../ProgressPage/ProgressPage";
import SignIn from "../SignIn/SignIn";
import Account from "../Account";
import ProtectedRoute from "../ProtectedRoute";
import SignUp from "../SignUp/SignUp";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Popup from 'reactjs-popup';

function App() {
  const [signinPopup, setSigninPopup]=useState(true)
  const { darkMode } = useContext(DarkModeContext);
  const { toggleDarkMode } = useContext(DarkModeContext);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className={darkMode ? `dark` : `app-container`}>
      {user ? (
        <div className="user-logout-container">
          <a href="/Account">{user.email}</a>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>DATE</p>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div className={darkMode ? `dark` : `home-page-container`}>
              <h1>100 Days of Code</h1>
              <p>Progress check app</p>
              <Button
                buttonText={darkMode ? `Light Mode` : `Dark Mode`}
                buttonClick={toggleDarkMode}
              />
              {/* <Button buttonText={signinPopup?"X":"Sign In"} buttonClick={()=>{setSigninPopup(!signinPopup)}}/> */}
              {signinPopup?<SignIn displayButtonText={signinPopup?"X":"Sign In"} displayButtonClick={()=>{setSigninPopup(!signinPopup)}} /> : <Button buttonText="Sign In" buttonClick={()=>{setSigninPopup(!signinPopup)}}/>}
              
            </div>
          }
        />
        <Route path="/Account" element={<Account />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route
          path="/ProgressPage"
          element={
            <ProtectedRoute>
              <ProgressPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
