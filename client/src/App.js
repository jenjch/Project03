import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";

function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path={["/"]}>
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
    </Router>
  );
}

export default App;
