import React, {
  useState,
  // useEffect
} from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import globalContext from "../../utils/store.js";
import { TextInput } from "react-materialize";

// default undefined from App.js
//  const globals = {email: null}

function Signup(props) {
  let [first, setFirst] = useState("");
  let [last, setLast] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let history = useHistory();
  let [validation, setValidation] = useState({
    first: false,
    last: false,
    email: false,
    password: false,
  });

  let [checkemail, setCheckemail] = useState("none");

  // regex for email
  // also need to make sure email doesn't already exist in database
  // const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const handleFirstChange = (event) => {
    setFirst(event.target.value);
    // console.log(event.target.value)
  };

  const handleLastChange = (event) => {
    setLast(event.target.value);
    // console.log(event.target.value)
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  };

  const handlePasswordChange = (event) => {
    // testing - adding trim to not count towards the password length limit validation in the return form render
    setPassword(event.target.value.trim());
    // console.log(event.target.value)
    setValidation({ password: password.length > 7 });
  };

  //  function refreshPage() {
  //     window.location.reload(false);
  //   }

  const handleClick = (event) => {
    event.preventDefault();

    console.log("entered email on signup", email);
    axios({
      method: "post",
      url: "/api/user",
      data: {
        firstname: first,
        lastname: last,
        email: email,
        password: password,
      },
    })
      .then((data) => {
        // data.data is part of the json (message sent from backend)
        if (data.data === "user already exists!") {
          // alert("email already exists!");
          setCheckemail("block");
          setEmail("");
          setPassword("");
        } else if (data.data === "User Created!") {
          // redirected to home page (which is log in page) to log in

          history.push("/");
          // use toggle from login page to ensure default "Log In" Component at the "/" route after redirect (rather than refresh)
          props.toggleView(true);
        }

        console.log("signup", data);
        // this.setState({ email: data })
      })
      .catch((err) => {
        console.log("signup error", err);
      });
  };

  return (
    <form className="signup">
      <div>
        <h3 className="white-text">Sign Up</h3>
        <div className="row">
          <div className="input-field col s6">
            <p className="white-text">First Name</p>
            <Input onChange={(event) => handleFirstChange(event)} />
          </div>
          <div className="input-field col s6">
            <p className="white-text">Last Name</p>
            <Input onChange={(event) => handleLastChange(event)} />
          </div>
        </div>
        <p className="white-text">Email</p>
        <TextInput
          email
          id="signupEmail"
          validate
          error="please type correct email format"
          onChange={(event) => handleEmailChange(event)}
          value={email}
        />
        <p className="white-text">Password</p>
        <TextInput
          password
          // validate = {false}
          // className = {(password.length > 0 && !validation.password) ? "validate invalid":"validate valid"}
          id="loginPassword"
          onChange={(event) => handlePasswordChange(event)}
          error="password must be at least 8 characters"
        />
        {/* testing adding validation text to password input */}
        {/* {password.length < 8 && (
          <p className="red-text">password must be at least 8 characters</p>
        )} */}

        <p className="red-text" style={{ display: checkemail }}>
          email already used
        </p>
        <button
          className="waves-effect waves-light btn blue darken-1"
          onClick={(event) => handleClick(event)}
        >
          Sign Up!
        </button>
      </div>
    </form>
  );
}
export default Signup;
