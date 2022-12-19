import React, { useState } from "react";
import { useContext } from "react";
import { DarkModeContext } from "../DarkModeContext.js";
import { UseEffectTrigger } from "../UseEffectTrigger.js";

function Display(props) {
  const { darkMode } = useContext(DarkModeContext);
  const [isEditing, setIsEditing] = useState(false);
  const [patchObj, setPatchObj] = useState({});
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  
  const {toggleEffectTrigger}=useContext(UseEffectTrigger)
  
  function inputValueDay(e) {

    setDay(e.target.value);
    setPatchObj({ ...patchObj, day: e.target.value });
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

  return (
    <div>
      {isEditing ? (
        <div>
          <input onChange={inputValueDay} type="text" defaultValue={props.displayDay} />
          <input onChange={inputValueSubject} type="text" defaultValue={props.displaySubject} />
          <button id={props.displayId} onClick={()=>{patchData(patchObj, props.displayId)}}>Done</button>
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
