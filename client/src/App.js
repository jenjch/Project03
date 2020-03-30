import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import globalContext from "./utils/store.js";
import axios from "axios";

function App() {
  const globals = { email: null };

  // replicates componentDidMount
  useEffect(() => {
    console.log("component mounted");
    axios
      .get("/api/user")
      .then(data => {
        console.log("testing get", data);
        globals.email = data.data.user.email;
      })
      .catch(err => {
        console.log("testing get error", err);
      });
  }, []);
  // default undefined
  // const globals = {email: null}
  //NOTE: JENNY ... for login submit, talk to Russell!

  return (
    <Router>
      <globalContext.Provider value={globals}>
        {" "}
        {/* how do I populate this with a value from log-in? */}
        <div>
          <Nav />
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path={["/trips"]}>
              <Trips />
            </Route>
            <Route>
              <NoMatch />
            </Route>
          </Switch>
        </div>
      </globalContext.Provider>
    </Router>
  );
}

export default App;
