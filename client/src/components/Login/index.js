import React, { useState, useEffect, useContext } from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store.js";
// import { TextInput } from "react-materialize";

function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [credentials, setCredentials] = useState("none")
  let [checkuser, setCheckuser] = useState("none")
  // let [checkEmailFormat, setCheckEmailFormat] = useState("none")

  // email used for globals is "renamed" to globalEmail since email is used above (for input)
  // use the emailHandler function from app.js
  const { email: globalEmail, emailHandler } = useContext(globalContext);
  console.log("check globalEmail", globalEmail);
  // used for redirect
  let history = useHistory();

  useEffect(() => {
    // on intial page load, if there's an email in global (logged in), redirect to restricted "/trips" page
    if (globalEmail) {
      history.push("/trips");
    }
  });

  const handleEmail = (event) => {
    setEmail(event.target.value);
    // console.log(event.target.value)

  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
    // console.log(event.target.value)
  };

  // axios click event. If correct credentials, update global, and redirect to destricted "/trips" page
  const handleClick = () => {
    console.log("email sent on log in click", email);
    // need to comment this pw part out eventually
    console.log("password sent on log in click", password);
    axios({
      method: "post",
      url: "/api/user/login",
      data: {
        email: email,
        password: password,
      },
    })
      .then((data) => {
        console.log("log in data", data);
        if (data.data === "user email does not exist!") {
          // alert("user doesn't exist");
          // shows error message for user does not exist (display block versus display none)
          setCheckuser("block");
          setEmail("");
          setPassword("");
          setCredentials("none");
        } else if (data) {
          // double check the data structure (no user)
          emailHandler(data.data.email);
          history.push("/trips");
        }
      })
      .catch((err) => {
        console.log("log in error", err);
        // alert("incorrect credentials")
        // shows error message for incorrect credentials (password)
        setCredentials("block");
        setPassword("");
      });
  };


  return (
    <div className="input-field">
      <h3 className="white-text center-align" type="text">
        Log In
      </h3>
      <p className="white-text" type="text">
        Email
      </p>
      <Input
        onChange={(event) => handleEmail(event)}
        value={email}
        className="white-text"
        //makes input text white
      />
      {/* <p className="red-text" style={{display: checkEmailFormat}}>email format invalid</p> */}
      <p className="white-text">Password</p>
      <Input
        type="password"
        onChange={(event) => handlePassword(event)}
        value={password}
        className="white-text"
        //makes input text white
      />
      <p className="red-text" style={{display: checkuser}}>user does not exist</p>
      <p className="red-text" style={{display: credentials}}>incorrect password</p>
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
