import React, { Component } from "react";

class Deconnection extends Component {
  componentDidMount() {
    localStorage.clear();
    window.location.replace("/");
    console.log("token supprimé");
  }
  render() {
    return <h1>Deconnection</h1>;
  }
}

export default Deconnection;
