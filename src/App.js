import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import BurgerBuilder from "./Containers/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router";
import Checkout from "./Containers/Checkout";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Switch>
        <Route path="/burger_builder" component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />{" "}
        <Redirect exact from="/" to="/burger_builder" />
      </Switch>
    </div>
  );
}

export default App;
