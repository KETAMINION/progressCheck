import React from "react";

function Input(props) {
  return (
    <div>
      <label for={props.for}>{props.label}</label>
      <input value={props.value} type="text" onChange={props.handleChange} placeholder={props.placeholder}/>
    </div>
  );
}
export default Input;
