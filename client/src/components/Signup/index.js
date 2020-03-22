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
        <h3>Sign Up</h3>
        <p>First Name</p>
        <Input/>
        <p>Last Name</p>
        <Input/>
        <p>Email</p>
        <Input onChange={event => handleEmailChange(event)}/>
        <p>Password</p>
       <Input/> 

       <button onClick={()=> handleClick()}>Sign Up!</button>
      </div>
    );
  }

  export default Signup;