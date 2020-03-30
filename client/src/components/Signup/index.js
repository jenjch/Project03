import React, { useState, useEffect } from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from 'react-router-dom';
import globalContext from "../../utils/store.js"

 // default undefined from App.js
//  const globals = {email: null}

function Signup(props) {
  let [first, setFirst] = useState("");
  let [last, setLast] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let history = useHistory();

  const handleFirstChange = event => {
    setFirst(event.target.value);
    // console.log(event.target.value)
  };

  const handleLastChange = event => {
    setLast(event.target.value);
    // console.log(event.target.value)
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };

  const handleClick = () => {
    console.log(email);
    axios({
      method: "post",
      url: "/api/user",
      data: {
        firstname: first,
        lastname: last,
        email: email,
        password: password
      }
    })
      .then(data => {
        // data.data is part of the json (message sent from backend)
        if (data.data === "User Created!"){
          // redirected to home page (which is log in page)
          history.push("/");
        }
      
        console.log("signup", data);
        // this.setState({ email: data })
      })
      
      .catch(console.log);
  };

  return (
    <div>
      <h3>Sign Up</h3>
      <p>First Name</p>
      <Input onChange={event => handleFirstChange(event)} />
      <p>Last Name</p>
      <Input onChange={event => handleLastChange(event)}/>
      <p>Email</p>
      <Input onChange={event => handleEmailChange(event)} />
      <p>Password</p>
      <Input onChange={event => handlePasswordChange(event)}/>

      <button onClick={() => handleClick()}>Sign Up!</button>
    </div>
  );
}
export default Signup;
