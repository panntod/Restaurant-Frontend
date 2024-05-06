import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./components/Nav";

import Home from "./views/Home";
import About from "./views/About";
import NotFound from "./views/NotFound";
import Login from "./views/Login";

import { getStatus } from "./utils/auth";
import Transaksi from "./views/Transaksi";

const App = () => {
  const status = getStatus();

  if (status.isLoggedIn) {
    return (
      <>
        <Nav isLoggedIn />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/transaksi">
            <Transaksi />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  } else {
    return (
      <>
        <Nav />
        <Login />
      </>
    );
  }
};

export default App;
