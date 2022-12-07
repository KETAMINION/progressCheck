import React from "react";
import { useContext } from "react";
import {DarkModeContext} from '../DarkModeContext.js'

function Display(props) {
  const {darkMode}  = useContext(DarkModeContext)

  return <li className={darkMode ? `dark` : `app-container`}>{props.displayDay} {props.displaySubject}</li>
  
  
}

export default Display;
