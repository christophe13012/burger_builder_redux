import React from "react";
import "./App.css";
import Navigation from "./Components/Navigation";
import BurgerBuilder from "./Containers/BurgerBuilder";

function App() {
  return (
    <div className="App">
      <Navigation />
      <BurgerBuilder />
    </div>
  );
}

export default App;
