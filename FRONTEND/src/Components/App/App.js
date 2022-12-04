import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import Display from "../Display/Display";
import Input from "../Input/Input";

function App() {
  const [day, setDay] = useState("");
  const [subject, setSubject] = useState("");
  const [daySubArr, setDaySubArr] = useState([]);
  const [postArray, setPostArray] = useState([])

  useEffect(()=> {
    async function getData (){
      const response = await fetch("http://localhost:3001/api")
      const data = await response.json()
      console.log(data)
      setDaySubArr(data.payload)
    }
    getData()

  }, [])
    

  
  function buttonClick() {
    setPostArray({ day: day, subject: subject })
    console.log("MYdata: ", postArray)
    
    updateData(postArray)
  }


  async function updateData(postArray){
    // console.log("MYdata: ", postObject)
    const response = await fetch("http://localhost:3001/api", {
      
    method: "POST",
          body: JSON.stringify(postArray),
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          }
        })
    
  } 


  
  
  
 
  
  


  // let daySubObj = {};
  // let daySubArr = [{day: day}, {day: day}];

  function inputValueDay(e) {
    setDay(e.target.value);
  }
  function inputValueSubject(e) {
    setSubject(e.target.value);
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
