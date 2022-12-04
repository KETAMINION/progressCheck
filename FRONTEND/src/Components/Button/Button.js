import React from "react";

function Button(props) {
  return <button onClick={props.buttonClick}>{props.buttonText}</button>;
}

export default Button;
