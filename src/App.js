import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import BurgerBuilder from "./Containers/BurgerBuilder";
import { Route, Switch, Redirect } from "react-router";
import Checkout from "./Containers/Checkout";
import Login from "./Containers/Login";
import Register from "./Containers/Register";
import Account from "./Containers/Account";
import Deconnection from "./Containers/Deconnection";
import { saveUserInfos, populateOrders } from "./Store/actions";
import { connect } from "react-redux";
import axios from "axios";

class App extends React.Component {
  state = {};
  async componentDidMount() {
    const token = localStorage.getItem("token");
    const objToken = { idToken: token };
    if (token !== null) {
      try {
        const response = await axios.post(
          "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfWM4xAXaIT7wpWcpU_jPN0OiC4gWoE1w",
          objToken
        );
        this.props.saveUserInfos(response.data.users[0]);
      } catch (error) {
        console.log(error);
      }
    }
    if (localStorage.ingredients !== undefined) {
      this.props.populateOrders(JSON.parse(localStorage.ingredients));
    }
  }
  render() {
    return (
      <div className="App">
        <Navigation />
        <Switch>
          <Route path="/burger_builder" component={BurgerBuilder} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={Login} />
          <Route path="/compte" component={Account} />
          <Route path="/register" component={Register} />
          <Route path="/deconnection" component={Deconnection} />
          <Redirect exact from="/" to="/burger_builder" />
        </Switch>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveUserInfos: userInfos => dispatch(saveUserInfos(userInfos)),
    populateOrders: ingredients => dispatch(populateOrders(ingredients))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(App);
