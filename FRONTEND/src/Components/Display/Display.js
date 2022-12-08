import React from "react";
import { useContext } from "react";
import {DarkModeContext} from '../DarkModeContext.js'

function Display(props) {
  const {darkMode}  = useContext(DarkModeContext)
  

  return [
    <li className={darkMode ? `dark` : `app-container`} id={props.displayId}>{props.displayDay} {props.displaySubject} </li>,
    <button id={props.editButtonId} onClick={props.buttonEdit}>Edit</button>
  ]
  
  
  
}

export default Display;
