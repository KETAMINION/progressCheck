import React, { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.js";
import { UseEffectTrigger } from "../UseEffectTrigger.js";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Display(props) {
  const { darkMode } = useContext(DarkModeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [patchObj, setPatchObj] = useState({});
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");

  
  const {toggleEffectTrigger}=useContext(UseEffectTrigger)
  
  function inputValueDay(e) {

    setDay(e.target.value);
    setPatchObj({ ...patchObj, day: e.target.value});
    console.log(day)
  }
  function inputValueSubject(e) {
    setSubject(e.target.value);
    setPatchObj({ ...patchObj, subject: e.target.value });
  }
  
  async function patchData(patchObj, id) {
    
    if (JSON.stringify(patchObj) !== "{}") {
      const response = await fetch(`http://localhost:3001/api/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patchObj),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
    }
    editDoneButton()
    toggleEffectTrigger()
  }
  
  function editDoneButton(day, subject){
    setPatchObj({day: day, subject: subject})
    console.log(patchObj)
    setIsEditing(!isEditing)
  }

  async function deleteButton(id) {
    const response = await fetch(`http://localhost:3001/api/${id}`, {
      method: "DELETE",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    toggleEffectTrigger()
  }

  return (
    <div>
      {isEditing ? (
        <div>
        
          <input type="date" label="Day" defaultValue={props.displayDay} onChange={inputValueDay}/>
          <input onChange={inputValueSubject} type="text" defaultValue={props.displaySubject} />
          <button id={props.displayId} onClick={()=>{patchData(patchObj, props.displayId)}}>Done</button>
          <button id={props.displayId} onClick={()=>{deleteButton(props.displayId)}}>Delete</button>
        </div>
      ) : (
        <div>
        <li key={props.liKey} className={darkMode ? `dark` : `app-container`}>
          {props.displayDay} {props.displaySubject}
        <button onClick={()=>{editDoneButton(props.displayDay, props.displaySubject)}}>Edit</button>
        </li>
        </div>
      )}
    </div>
  );
}

export default Display;
