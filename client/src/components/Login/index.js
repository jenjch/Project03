import React, { useState, useEffect, useContext } from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store.js";



function Login(props) {

  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  
  // email used for globals is "renamed" to globalEmail since email is used above (for input)
  // use the emailHandler function from app.js
  const { email: globalEmail, emailHandler } = useContext(globalContext);
  console.log("check globalEmail", globalEmail);
  let history = useHistory();

  useEffect(() => {
    // on intial page load, if there's an email in global (logged in), redirect to restricted "/trips" page
    if (globalEmail) {
      history.push("/trips")
    }
  });
  
  // regex for email
  // const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  // need to give error if email or password is incorrect (check back end)
  const handleEmail = event => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  };

  const handlePassword = event => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };

  // axios click event. If correct credentials, update global, and redirect to destricted "/trips" page
  const handleClick = () => {
    console.log("email sent on log in click", email);
    console.log("password send on log in click", password);
    axios({
      method: "post",
      url: "/api/user/login",
      data: {
        email: email,
        password: password
      }
    })
      .then(data => {
        console.log("log in data", data);
        if (data) {
          // double check the data structure (no user)
          emailHandler(data.data.email);
          history.push("/trips");
        }
      })
      .catch(err => {
        // put useRef input clear (may want to choose which inputs to clear)
        console.log("log in error", err);
      });

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
      <h3 className="white-text" type="text">
        Log In
      </h3>
      <p className="white-text" type="text">
        Email
      </p>
      <Input onChange={event => handleEmail(event)} />
      <p className="white-text">Password</p>
      <Input
        id="password"
        type="password"
        onChange={event => handlePassword(event)}
      />
      <button
        className="waves-effect waves-light btn blue darken-1"
        onClick={() => handleClick()}
      >
        Log In!
      </button>
    </div>
  );
}

export default Login;
