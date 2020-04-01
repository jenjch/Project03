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
          // redirect works but page not rendered correctly yet
          history.push("/trips");
        }
      
        console.log("signup", data);
        // this.setState({ email: data })
      })
      
      .catch(console.log);
  };

  return (
    <div className="input-field col s12">
      <h3 className="white-text">Sign Up</h3>
      <p className="white-text" >First Name</p>
      <Input />
      <p className="white-text" >Last Name</p>
      <Input />
      <p className="white-text" >Email</p>
      <Input onChange={event => handleEmailChange(event)} />
      <p className="white-text" >Password</p>
      <Input />

      <button className="waves-effect waves-light btn blue darken-1" onClick={() => handleClick()}>Sign Up!</button>
    </div>
  );
}
export default Signup;
