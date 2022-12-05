import React from "react";

function Input(props) {
  return (
    <div>
      <label for={props.for}>{props.label}</label>
      <input value={props.value} type="text" onChange={props.handleChange}/>
    </div>
  );
}
export default Input;
