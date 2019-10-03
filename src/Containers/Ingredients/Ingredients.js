import React from "react";
import "./Ingredients.css";

const Ingredients = ({ type }) => {
  switch (type) {
    case "BreadTop":
      return (
        <div className="BreadTop">
          <div className="Seeds1"></div>
          <div className="Seeds2"></div>
        </div>
      );
    case "BreadBottom":
      return <div className="BreadBottom"></div>;
    case "Salade":
      return <div className="Salad"></div>;
    case "Viande":
      return <div className="Meat"></div>;
    case "Fromage":
      return <div className="Cheese"></div>;
    case "Bacon":
      return <div className="Bacon"></div>;

    default:
      return null;
  }
};

export default Ingredients;
