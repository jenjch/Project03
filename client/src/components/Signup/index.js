import React, { useState, useEffect } from "react";
import { Input } from "../Form";
import axios from "axios";
// import { useHistory } from 'react-router-dom';
import globalContext from "../../utils/store.js"

 // default undefined from App.js
//  const globals = {email: null}

function Signup(props) {
  let [first, setFirst] = useState("");
  let [last, setLast] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  // let history = useHistory();

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

  function refreshPage() {
    window.location.reload(false);
  }

  const handleClick = () => {
    console.log("entered email on signup", email);
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
          // redirected to home page (which is log in page) to log in
          // use refresh instead of history.push redirect to the default "Log In" Component at the "/" route
          // history.push("/");
          refreshPage();
        }
      
        console.log("signup", data);
        // this.setState({ email: data })
      })
      .catch(err => {
        console.log("signup error", err);
      });

  };

  return (
    <div>
      <h3 className="white-text">Sign Up</h3>
      <p className="white-text" >First Name</p>
      <Input onChange={event => handleFirstChange(event)}/>
      <p className="white-text" >Last Name</p>
      <Input onChange={event => handleLastChange(event)}/>
      <p className="white-text" >Email</p>
      <Input onChange={event => handleEmailChange(event)} />
      <p className="white-text" >Password</p>
      <Input type="password" onChange={event => handlePasswordChange(event)}/>

      <button className="waves-effect waves-light btn blue darken-1" onClick={() => handleClick()}>Sign Up!</button>
    </div>
  );
}
export default Signup;
