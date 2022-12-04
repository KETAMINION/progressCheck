import React from "react";

function Input(props) {
  return (
    <div>
      <label for={props.for}>{props.label}</label>
      <input type="text" onChange={props.handleChange}/>
    </div>
  );
}
export default Input;
