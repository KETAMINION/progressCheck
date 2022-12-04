import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";

function App() {
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);

  let daySubObj = {};
  // let daySubArr = [{day: day}, {day: day}];

  function inputValueDay(e) {
    setDay(e.target.value);
  }
  function inputValueSubject(e) {
    setSubject(e.target.value);
  }

  function buttonClick(e) {
    daySubObj = { day: day, subject: subject };
    setDaySubArr([...daySubArr, daySubObj]);
    console.log(daySubArr);
  }

  useEffect(()=> {
    async function getData (){
      const response = await fetch("/api")
      const data = await response.json()
      console.log(data)
    }
    getData()

  }, [])



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
