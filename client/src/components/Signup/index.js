import React, { useState, useEffect } from "react";
import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import globalContext from "../../utils/store.js";
import { TextInput } from "react-materialize";

// default undefined from App.js
//  const globals = {email: null}

function Signup(props) {
  let [first, setFirst] = useState(null);
  let [last, setLast] = useState(null);
  let [email, setEmail] = useState(null);
  let [password, setPassword] = useState(null);
  // for redirecting page to log in after successful sign up
  let history = useHistory();

  // used for checking if entire form is valid
  let [validation, setValidation] = useState({
    first: false,
    last: false,
    email: false,
    password: false,
  });

  let [checkFirst, setCheckFirst] = useState("none");
  let [checkLast, setCheckLast] = useState("none");
  let [checkPassword, setCheckPassword] = useState("none");
  let [checkEmailExists, setCheckEmailExists] = useState("none");
  let [checkForm, setCheckForm] = useState("none");

  let [checkEmailRegEx, setCheckEmailRegEx] = useState("none");

  // regex for email
  // eslint-disable-next-line
  const validEmailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  // input validations (length and regex), toggle display none vs. block (on error message divs) and toggle validation to false if invalid
  useEffect(() => {
    if (first === null || first.length > 0) {
      setCheckFirst("none");
    } else {
      setCheckFirst("block");
      setValidation({ ...validation, first: false });
    }
    if (last === null || last.length > 0) {
      setCheckLast("none");
    } else {
      setCheckLast("block");
      setValidation({ ...validation, last: false });
    }
    if (password === null || password.length >= 8) {
      setCheckPassword("none");
      // setValidation({ ...validation, password: true });
    } else {
      setCheckPassword("block");
      setValidation({ ...validation, password: false });
    }
    if (email === null || validEmailRegex.test(email)) {
      setCheckEmailRegEx("none");
      // setValidation({ ...validation, password: true });
    } else {
      setCheckEmailRegEx("block");
      setValidation({ ...validation, password: false });
    }
  }, [first, last, password, email]);

  // toggle validation to true in first name input field if length condition met
  const handleFirstChange = (event) => {
    setFirst(event.target.value);
    if (event.target.value !== null && event.target.value.length > 0) {
      setValidation({ ...validation, first: true });
    }
    // console.log(event.target.value)
    // if (first.length > 0) {
    //   setCheckFirst("none");
    // } else {
    //   setCheckFirst("block");
    // }
  };

  // toggle validation to true in last name input field if length condition met
  const handleLastChange = (event) => {
    setLast(event.target.value);
    if (event.target.value !== null && event.target.value.length > 0) {
      setValidation({ ...validation, last: true });
    }
    // console.log(event.target.value)
    // if (last.length < 1) {
    //   setCheckLast("block");
    // } else {
    //   setCheckLast("none");
    // }
  };

  // toggle validation to true in input field if conditions met for email regex test
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(event.target.value)
    console.log("regEx", validEmailRegex.test(email));
    if (email !== null && validEmailRegex.test(email)) {
      setValidation({ ...validation, email: true });
    }
  };

  // toggle validation to true in password input field if length condition met
  const handlePasswordChange = (event) => {
    // testing - adding trim to not count towards the password length limit validation in the return form render
    setPassword(event.target.value);
    if (event.target.value !== null && event.target.value.length >= 8) {
      setValidation({ ...validation, password: true });
    }
    // console.log(event.target.value)
    // setValidation({ password: password.length > 7 });
  };

  //  function refreshPage() {
  //     window.location.reload(false);
  //   }

  // on sign up button click, check if form is valid (all fields must be valid for form to be valid)
  const handleClick = (event) => {
    event.preventDefault();
    console.log(validation);
    var validForm = Object.values(validation).every((el) => el === true);
    console.log("validForm", validForm);

    // if form is not valid, clear inputs, show invalid form message div, and set all individual input error message divs to display as none again
    if (!validForm) {
      console.log("form invalid");
      setFirst(null);
      setLast(null);
      setPassword(null);
      setEmail(null);
      setCheckForm("block");
      setCheckFirst("none");
      setCheckLast("none");
      setCheckPassword("none");
      setCheckEmailRegEx("none");

      setValidation({
        ...validation,
        first: false,
        last: false,
        password: false,
        email: false,
      });

      return;
    }

    console.log(first, last, email, password, "test input");
    console.log("entered email on signup", email);

    // otherwise if form is valid, run axios post to sent form data
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

          // if user already exists, show the "email already used" error message div, clear all inputs
          setCheckEmailExists("block");
          setFirst(null);
          setLast(null);
          setEmail(null);
          setPassword(null);
          // don't need to show the invalid form message (technically is valid even if user already exists)
          setCheckForm("none");
        } else if (data.data === "User Created!") {
          // redirected to home page (which is log in page) to log in if user successfully created

          history.push("/");
          // use toggle from login page to ensure default "Log In" Component at the "/" route after redirect (rather than refresh)
          props.toggleView(true);
        }

        console.log("signup", data);
      })
      .catch((err) => {
        console.log("signup error", err);
      });
  };

  return (
    <form className="signup">
      <div>
        <h3 className="white-text center-align">Sign Up</h3>
        <div className="row">
          <div className="input-field col s6">
            <p className="white-text">First Name</p>
            <Input
              onChange={(event) => handleFirstChange(event)}
              value={first === null ? "" : first}
            />
            <p className="red-text" style={{ display: checkFirst }}>
              field cannot be blank
            </p>
          </div>
          <div className="input-field col s6">
            <p className="white-text">Last Name</p>
            <Input
              onChange={(event) => handleLastChange(event)}
              value={last === null ? "" : last}
            />
            <p className="red-text" style={{ display: checkLast }}>
              field cannot be blank
            </p>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
          <p className="white-text">Email</p>
          <Input
          // email
          // id="signupEmail"
          // validate
          // error="please type correct email format"
          onChange={(event) => handleEmailChange(event)}
          value={email === null ? "" : email}
        />
        <p className="red-text" style={{ display: checkEmailRegEx }}>
          email format invalid
        </p>
        <p className="white-text">Password</p>
        <Input
          type="password"
          // validate = {false}
          // className = {(password.length > 0 && !validation.password) ? "validate invalid":"validate valid"}
          // id="loginPassword"
          onChange={(event) => handlePasswordChange(event)}
          value={password === null ? "" : password}
          // error="password must be at least 8 characters"
        />
        {/* testing adding validation text to password input */}
        {/* {password.length < 8 && (
          <p className="red-text">password must be at least 8 characters</p>
        )} */}
          </div>
        </div>
        <p className="red-text" style={{ display: checkPassword }}>
          password must be at least 8 characters
        </p>
        <p className="red-text" style={{ display: checkEmailExists }}>
          email already used
        </p>
        <p className="red-text" style={{ display: checkForm }}>
          form invalid
        </p>
        <button id="signupbtn"
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
