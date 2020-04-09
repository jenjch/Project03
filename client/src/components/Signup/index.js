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
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState(null);
  let history = useHistory();
  let [validation, setValidation] = useState({
    first: false,
    last: false,
    // meed to add email 
    // email: false,
    password: false,
  });

  let [checkFirst, setCheckFirst] = useState("none");
  let [checkLast, setCheckLast] = useState("none");
  let [checkPassword, setCheckPassword] = useState("none");
  let [checkemail, setCheckemail] = useState("none");
  let [checkForm, setCheckForm] = useState("none");

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
    if (password === null || password.length >= 7) {
      setCheckPassword("none");
      // setValidation({ ...validation, password: true });
    } else {
      setCheckPassword("block");
      setValidation({ ...validation, password: false });
    }
  }, [first, last, password]);
  
  // regex for email
  // const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

  const handleFirstChange = (event) => {
    setFirst(event.target.value);
    if (first !== null && first.length > 0) {
      setValidation({ ...validation, first: true });
    }
    // console.log(event.target.value)
    // if (first.length > 0) {
    //   setCheckFirst("none");
    // } else {
    //   setCheckFirst("block");
    // }
  };

  const handleLastChange = (event) => {
    setLast(event.target.value);
    if (last !== null && last.length > 0) {
      setValidation({ ...validation, last: true });
    }
    // console.log(event.target.value)
    // if (last.length < 1) {
    //   setCheckLast("block");
    // } else {
    //   setCheckLast("none");
    // }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // console.log(event.target.value)
  };

  const handlePasswordChange = (event) => {
    // testing - adding trim to not count towards the password length limit validation in the return form render
    setPassword(event.target.value);
    if (password !== null && password.length >= 7) {
      setValidation({ ...validation, password: true });
    }
    // console.log(event.target.value)
    // setValidation({ password: password.length > 7 });
  };

  //  function refreshPage() {
  //     window.location.reload(false);
  //   }

  const handleClick = (event) => {
    event.preventDefault();
    console.log(validation);
    var validForm = Object.values(validation).every((el) => el === true);
    console.log("validForm", validForm);

    if (!validForm) {
      console.log("form invalid");
      setFirst(null);
      setLast(null);
      setPassword(null);
      setCheckForm("block");
      setCheckFirst("none");
      setCheckLast("none")
      setCheckPassword("none");
      setValidation({ ...validation, first: false, last:false, password:false });

      return 
    }
    console.log(first, last, email, password, "test input")
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
        <h3 className="white-text center-align">Sign Up</h3>
        <div className="row">
          <div className="input-field col s6">
            <p className="white-text">First Name</p>
            <Input onChange={(event) => handleFirstChange(event)} value={first===null ? "" : first} />
        
            <p className="red-text" style={{ display: checkFirst }}>
              field cannot be blank
            </p>
          </div>
          <div className="input-field col s6">
            <p className="white-text">Last Name</p>
            <Input onChange={(event) => handleLastChange(event)} value={last===null ? "" : last}/>
            <p className="red-text" style={{ display: checkLast }}>
              field cannot be blank
            </p>
          </div>
        </div>
        <p className="white-text">Email</p>
        <TextInput
        //this class makes the input text white
        className="white-text"
          email
          id="signupEmail"
          validate
          error="please type correct email format"
          onChange={(event) => handleEmailChange(event)}
          value={email}
        />
        <p className="white-text">Password</p>
        <TextInput
        //this class makes the input text white
        className="white-text"
          password
          // validate = {false}
          // className = {(password.length > 0 && !validation.password) ? "validate invalid":"validate valid"}
          id="loginPassword"
          onChange={(event) => handlePasswordChange(event)}
          value={password===null ? "" : password}
          // error="password must be at least 8 characters"
        />
        {/* testing adding validation text to password input */}
        {/* {password.length < 8 && (
          <p className="red-text">password must be at least 8 characters</p>
        )} */}
        <p className="red-text" style={{ display: checkPassword }}>
          password must be at least 8 characters
        </p>
        <p className="red-text" style={{ display: checkemail }}>
          email already used
        </p>
        <p className="red-text" style={{ display: checkForm}}>
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
