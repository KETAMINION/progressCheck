import React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";
import {DarkModeContext} from '../DarkModeContext.js'
import { UseEffectTrigger } from "../UseEffectTrigger.js";

import './App.css'

function App() {
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);
  // const [postArray, setPostArray] = useState([]);
  const [result, setResult] = useState("");
  const [postObj, setPostObj] = useState({});

  const {darkMode}  = useContext(DarkModeContext)
  const {toggleDarkMode} = useContext(DarkModeContext)

  const {effectTrigger}=useContext(UseEffectTrigger)
  const {toggleEffectTrigger}=useContext(UseEffectTrigger)

  

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3001/api");
      const data = await response.json();
      console.log(data);
      setDaySubArr(data.payload);
    }
    getData();
  }, [result, effectTrigger]);

  function inputValueDay(e) {
    setDay(e.target.value);
    setPostObj({ ...postObj, day: e.target.value });
  }
  function inputValueSubject(e) {
    setSubject(e.target.value);
    setPostObj({ ...postObj, subject: e.target.value });
  }
  // function settingUpObj(){
  //   setPostArray({ day: day, subject: subject });
  // }

  
  function buttonClick() {
    updateData(postObj);
    setDay("");
    setSubject("")
  }
  async function updateData(postObj) {
    if (JSON.stringify(postObj) !== "{}") {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        body: JSON.stringify(postObj),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setResult(result);
    }
  }

  async function patchData(postObj,id) {
    if (JSON.stringify(postObj) !== "{}") {
      const response = await fetch(`http://localhost:3001/api/${id}`, {
        method: "PATCH",
        body: JSON.stringify(postObj),
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await response.json();
      setResult(result);
    }
  }

  function handleEditButtton(){
    let editDay = prompt("Edit day", "adad");
    let editSubject = prompt("Edit subject");
   
    setPostObj({ ...postObj, day: editDay, subject: editSubject });
  }

  console.log(postObj)

  return (
    
    <div className={darkMode ? `dark` : `app-container`}>
      
      <h1>100 Days of Code!</h1>
      <p>Edit Your progress here:</p>
      <Input value={day} for="day" label="Day" handleChange={inputValueDay} />
      <Input value={subject} for="subject" label="Subject" handleChange={inputValueSubject} />
      <Button buttonText="Add" buttonClick={buttonClick} />
      
      <Button buttonText="Delete" />
      <Button buttonText={darkMode ? `Light Mode` : `Dark Mode`} buttonClick={toggleDarkMode} />
     
      
      <ul className="ul-container">
        {daySubArr.map((element) => {
          return (
            <Display
              displayId={element.id}
              displayDay={element.day}
              displaySubject={element.subject}
              displayId={element.id}
            />

          )
        })}
      </ul>
      
    </div>
   
  );
}

export default App;
