import React, { useState, useEffect } from "react";
import {Input} from "../Form";
import axios from "axios";
import globalContext from "../../utils/store.js"

 // default undefined from App.js
//  const globals = {email: null}

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

  // need to fix log in and add redirect
  const handleClick = () => {
    console.log(email);
    console.log(password);
      axios({
        method: "post",
        url: "/api/user/login",
        data: {
          email: "ben3@email.com",
          password: "123456"
        }
      })
  }


    // write function to check if authenticated (goes in app.js?)

    // figure out how to set the email to global context

  

    return (
      <div>
        <h3>Log In</h3>
        <p>Email</p>
        <Input onChange={event => handleEmail(event)}/>
        <p>Password</p>
       <Input onChange={event => handlePassword(event)}/> 

       <button onClick={()=> handleClick()}>Log In!</button>
      </div>
    );
  }

  export default Login;