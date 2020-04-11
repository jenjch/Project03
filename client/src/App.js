import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import globalContext from "./utils/store.js";
import axios from "axios";
// import { useHistory } from "react-router-dom";
import Footer from "./components/Footer"

function App() {
  // const globals = { email: null };
  // let history = useHistory();
  const [email, setEmail] = useState("");
  console.log("testing app default email", email)

  const emailHandler = (input) => {
    setEmail(input);
  }

  // replicates componentDidMount
  useEffect(() => {

    console.log("component mounted");
    axios
      .get("/api/user")
      .then(data => {
        console.log("testing get", data);
        // globals.email = data.data.user.email;
        
        if (data.data.user !== null) {
          console.log("check user data is there", data.data.user.email)
          emailHandler(data.data.user.email);
          console.log("globals email", email)
          // wrote redirect to "/trips" page in the log in component
        }

      })
      .catch(err => {
        console.log("testing get error", err);
      });
  }, [email]);

  return (
    <Router>
      {/* <globalContext.Provider value={globals}> */}
        <globalContext.Provider value={{email, emailHandler}}>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/trips">
              <Trips />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </globalContext.Provider>
      <Footer/>
    </Router>
  );
}

export default App;
