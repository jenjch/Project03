import React, { useState, useEffect } from "react";
import {Input} from "../Form";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import globalContext from "../../utils/store.js"

 // default undefined from App.js
//  const globals = {email: null}

function Login(props) {

  let [email, setEmail] = useState ("")
  let [password, setPassword] = useState ("")
  let history = useHistory();

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
          email: email,
          password: password
        }
      })

      // Need to direct to "/trips"
      // .then(data => {
      //   // data.data is part of the json (message sent from backend)
      //   if (data.data === "User Created!"){
      //     // redirect works but page not rendered correctly yet
      //     history.push("/trips");
      //   }
      
      //   console.log("signup", data);
      //   // this.setState({ email: data })
      // })
      
      // .catch(console.log);
  };



    // write function to check if authenticated (goes in app.js?)

    // figure out how to push the email (after authenticated log in) to global context
  

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