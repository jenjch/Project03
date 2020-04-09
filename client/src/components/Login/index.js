import React, { useState, useEffect, useContext } from "react";
// import { Input } from "../Form";
import axios from "axios";
import { useHistory } from "react-router-dom";
import globalContext from "../../utils/store.js";
import { TextInput } from "react-materialize";

function Login(props) {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [credentials, setCredentials] = useState("none")
  let [checkuser, setCheckuser] = useState("none")

  // email used for globals is "renamed" to globalEmail since email is used above (for input)
  // use the emailHandler function from app.js
  const { email: globalEmail, emailHandler } = useContext(globalContext);
  console.log("check globalEmail", globalEmail);
  let history = useHistory();

  useEffect(() => {
    // on intial page load, if there's an email in global (logged in), redirect to restricted "/trips" page
    if (globalEmail) {
      history.push("/trips");
    }
  });

  // need to give error if email or password is incorrect (check back end)
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

  function sendEmail() {
    // event.preventDefault();

    //collect the values from input
    // var enteredName =  stateForm.enteredName;
    // var enteredEmail =  stateForm.enteredEmail;
    // var enteredMessage = stateForm.enteredMessage;

    //make sure name and email are not empty
    //     if (!enteredName || !enteredEmail || !enteredMessage)
    //     {
    //       console.log("Name, email, and message are all required.")
    //     }
    //     else
    //     {
    //       axios(
    //       {
    //         method: "POST",
    //         //url:"http://localhost:3001/send",
    //         url: process.env.PORT,
    //         data:
    //         {
    //           name: enteredName,
    //           email: enteredEmail,
    //           message:  enteredMessage
    //         }
    //       });

    //       setStateForm(
    //       {
    //         enteredName : "",
    //         enteredEmail : "",
    //         enteredMessage : ""
    //       });

    //       document.getElementById('input_name').value = "";
    //       document.getElementById('input_email').value = "";
    //       document.getElementById('input_message').value = "";

    //     };
    console.log(process.env.PORT);
    axios({
      method: "POST",
      // url: "http://localhost:3001/send",
      // url: process.env.PORT, 
      // need to see if this needs to be changed for deployed heroku version (process.env.PORT does NOT work on local written in the .env file as process.env.PORT="http://localhost:3001/send", process.env.PORT=http://localhost:3001/send, or PORT=3001 with below code. All return in the console.log as undefined)
      url: `http://localhost:${process.env.PORT || 3001}/send`,
      data: {
        name: "Angel",
        email: "bootcamp_project@yahoo.com",
        tripName: "Turkey",
        receiptsBody: "Turkey testing message body of email",
      },
      // }).then((response)=>{
      //   if (response.data.msg === 'success'){
      //       alert("Email sent, awesome!");
      //       this.resetForm()
      //   }else if(response.data.msg === 'fail'){
      //       alert("Oops, something went wrong. Try again")
      //   }
      // });
    })
      .then((response) => {
        console.log("email sent!", response);
        alert("email sent from button click");
      })
      .catch((err) => {
        console.log("error", err);
        alert("error sending email: " + err);
      });
  }

  return (
    <div className="input-field">
      <h3 className="white-text center-align" type="text">
        Log In
      </h3>
      <p className="white-text" type="text">
        Email
      </p>
      <TextInput
        email
        id="loginEmail"
        validate
        // success="correct email format"
        error="please type correct email format"
        onChange={(event) => handleEmail(event)}
        value={email}
        className="white-text"
        //makes input text white
      />
      <p className="white-text">Password</p>
      <TextInput
        password
        id="loginPassword"
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

      <button
        className="waves-effect waves-light btn blue darken-1"
        onClick={() => sendEmail()}
      >
        Send Email Test!
      </button>
    </div>
  );
}

export default Login;
