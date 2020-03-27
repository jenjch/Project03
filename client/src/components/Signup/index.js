import React, { useState, useEffect } from "react";
import {Input} from "../Form";

function Signup(props) {

  let [email, setEmail] = useState ("")

  const handleEmailChange = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  }

  const handleClick = () => {
    console.log(email);
  }

    return (
      <div>
        <h3 className="white-text">Sign up</h3>
        <p className="white-text">FIrst Name</p>
        <Input/>
        <p className="white-text">Last Name</p>
        <Input/>
        <p className="white-text">Email</p>
        <Input onChange={event => handleEmailChange(event)}/>
        <p className="white-text">Password</p>
        <Input/>
        <button className="waves-effect waves-light btn blue darken-1" onClick={() => handleClick}>Sign up!</button>
      </div>

    );
  }

  export default Signup;