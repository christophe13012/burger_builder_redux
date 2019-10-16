import React, { Component } from "react";

class Deconnection extends Component {
  componentDidMount() {
    localStorage.clear();
    setTimeout(() => {
      window.location.replace(
        "https://christophe13012.github.io/burger_builder_redux"
      );
    }, 1500);

    console.log("token supprimé");
  }
  render() {
    return (
      <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
        Deconnection en cours ...
      </h1>
    );
  }
}

export default Deconnection;
