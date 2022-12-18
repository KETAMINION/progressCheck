import React from "react";
import { useEffect, useState, useContext } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";
import { DarkModeContext } from "../DarkModeContext.js";
import { UseEffectTrigger } from "../UseEffectTrigger.js";
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth"
import { auth } from "../firebase-config";

import "./App.css";

function App() {
  
  const [registerEmail, setRegisterEmail]=useState("")
  const [registerPassword, setRegisterPassword]=useState("")
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [user, setUser]=useState({})

  useEffect(()=>{
    onAuthStateChanged(auth, (currentUser)=>{
      setUser(currentUser);
    });
  },[])

  const register = async () => {
    try{
      const user = await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      console.log(user)
    } catch (error){
      console.log(error.message);
    }
  };
  const login = async () => {
    try{
      const user = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      console.log(user)
    } catch (error){
      console.log(error.message);
    }
  };
  const logout = async () => {
    await signOut(auth)
  };

  function emailCreate(event){
    setRegisterEmail(event.target.value)
  }
  function passwordCreate(event){
    setRegisterPassword(event.target.value)
  }
  
  function emailLogin(event){
    setLoginEmail(event.target.value)
  }
  function passwordLogin(event){
    setLoginPassword(event.target.value)
  }
  
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);
  // const [postArray, setPostArray] = useState([]);
  const [result, setResult] = useState("");
  const [postObj, setPostObj] = useState({});

  const { darkMode } = useContext(DarkModeContext);
  const { toggleDarkMode } = useContext(DarkModeContext);

  const { effectTrigger } = useContext(UseEffectTrigger);

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
    setSubject("");
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

  return (
    <div className={darkMode ? `dark` : `app-container`}>
      <div className="auth-container">
        <div className="create-user-container">
          <p>Create user</p>
          <Input placeholder="Email" handleChange={emailCreate} />
          <Input placeholder="Password" handleChange={passwordCreate}/>
          <Button buttonText="Create user" buttonClick={register}/>
        </div>
        <div className="login-container">
          <p>Login</p>
          <Input placeholder="Email" handleChange={emailLogin}/>
          <Input placeholder="Password" handleChange={passwordLogin}/>
          <Button buttonText="Login" buttonClick={login}/>
        </div>
        <p>User logged in:</p>
        <p>{user?user.email: "No one is signed in"}</p>
        <Button buttonText='Sign Out' buttonClick={logout}/>
      </div>

      <h1>100 Days of Code!</h1>
      <p>Edit Your progress here:</p>
      <Input value={day} for="day" label="Day" handleChange={inputValueDay} />
      <Input
        value={subject}
        for="subject"
        label="Subject"
        handleChange={inputValueSubject}
      />
      <Button buttonText="Add" buttonClick={buttonClick} />

      <Button buttonText="Delete" />
      <Button
        buttonText={darkMode ? `Light Mode` : `Dark Mode`}
        buttonClick={toggleDarkMode}
      />

      <ul className="ul-container">
        {daySubArr.map((element) => {
          return (
            <Display
              displayId={element.id}
              displayDay={element.day}
              displaySubject={element.subject}
              liKey={element.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
