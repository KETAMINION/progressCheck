import React from "react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";

function App() {
  const [day, setDay] = useState("");
  // const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);
  // const [postArray, setPostArray] = useState([]);
  const [result, setResult] = useState("");
  const [postObj, setPostObj] = useState({});

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3001/api");
      const data = await response.json();
      console.log(data);
      setDaySubArr(data.payload);
    }
    getData();
  }, [result]);

  function inputValueDay(e) {
    // setDay(e.target.value);
    setPostObj({ ...postObj, day: e.target.value });
  }
  function inputValueSubject(e) {
    // setSubject(e.target.value);
    setPostObj({ ...postObj, subject: e.target.value });
  }
  // function settingUpObj(){
  //   setPostArray({ day: day, subject: subject });
  // }
  function buttonClick() {
    updateData(postObj);
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
    <div>
      <h1>100 Days of Code!</h1>
      <p>Edit Your progress here:</p>
      <Input for="day" label="Day" handleChange={inputValueDay} />
      <Input for="subject" label="Subject" handleChange={inputValueSubject} />
      <Button buttonText="Add" buttonClick={buttonClick} />
      <Button buttonText="Edit" />
      <Button buttonText="Delete" />
      <ul>
        {daySubArr.map((element) => {
          return (
            <Display
              displayDay={element.day}
              displaySubject={element.subject}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
