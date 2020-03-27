import React, { useState, useEffect } from "react";
import {Input} from "../Form";

function Login(props) {

  let [email, setEmail] = useState ("")
  let [password, setPassword] = useState ("")

  const handleEmail = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  }

  const handlePassword = event => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  }

  const handleClick = () => {
    console.log(email);
    console.log(password);
  }

    return (
      <div>
        <h3 className="white-text" type="text">Log In</h3>
        <p className="white-text" type="text">Email</p>
        <Input onChange={event => handleEmail(event)}/>
        <p className="white-text">Password</p>
       <Input id="password" type="password" onChange={event => handlePassword(event)}/> 
       <button className="waves-effect waves-light btn blue darken-1" onClick={()=> handleClick()}>Log In!</button>
      </div>
    );
  }

  export default Login;