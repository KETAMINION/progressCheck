import React from "react";
import { useEffect, useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";

function App() {
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);
  const [postArray, setPostArray] = useState([]);
  const [result, setResult] = useState("");

  useEffect(() => {
    async function getData() {
      const response = await fetch("http://localhost:3001/api");
      const data = await response.json();
      console.log(data);
      setDaySubArr(data.payload);
    }
    getData();
  }, [result]);

  
  function inputValue(e) {
    setDay(e.target.value);
    setSubject(e.target.value);
    setPostArray({ day: day, subject: subject });
  }

  function buttonClick() {
    updateData(postArray);
  }

  async function updateData(postArray) {
    if (JSON.stringify(postArray) !== "{}") {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        body: JSON.stringify(postArray),
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
      <Input for="day" label="Day" handleChange={inputValue} />
      <Input for="subject" label="Subject" handleChange={inputValue} />
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
