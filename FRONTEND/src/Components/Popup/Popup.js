import React from 'react';
import Popup from 'reactjs-popup';
import SignIn from '../SignIn/SignIn';
import './Popup.css';

function Popup(){
return( 
    <Popup trigger={<button className="signIn">Sign In</button>}
    modal
    nested>
        {(close) => (
      <div className="modal">
        <SignIn></SignIn>
        <button className="close" onClick={close}>
          &times;
        </button>
           </div>)}
    </Popup>)
}

export default Popup