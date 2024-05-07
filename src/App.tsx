import React from "react";
import { Switch, Route } from "react-router-dom";

import { getStatus } from "./utils/auth";
import Navbar from "./components/Navbar";
import { Redirect } from "react-router-dom";

import NotFound from "./views/NotFound";
import Transaksi from "./views/Transaksi";
import Login from "./views/Login";
import Order from "./views/Order";
import Food from "./views/Food";
import Cart from "./views/Cart";

const App = () => {
  const status = getStatus();

  if (status.isLoggedIn) {
    return (
      <>
        <Navbar isLoggedIn />
        <Switch>
          <Route exact path="/food">
            <Food />
          </Route>
          <Route exact path="/transaksi">
            <Transaksi />
          </Route>
          <Route exact path="/login">
            <Redirect to="/food" />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Order />
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
        <Navbar />
        <Switch>
          <Route exact path="/food">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/transaksi">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/">
            <Order />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </>
    );
  }
};

export default App;
