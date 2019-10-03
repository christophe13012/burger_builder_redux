import React from "react";
import Ingredients from "../Ingredients/Ingredients";
import "./Burger.css";
import { connect } from "react-redux";

const Burger = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    for (let i = 0; i < props.ingredients[key]; i++) {
      ingredients.push(key);
    }
  }
  return (
    <div className="Burger" style={{ marginTop: 35 }}>
      <Ingredients type="BreadTop" />
      {ingredients.length === 0 ? (
        <p>Selectionnez au moins un ingredient</p>
      ) : (
        ingredients.map((igd, index) => {
          return <Ingredients key={igd + index} type={igd} />;
        })
      )}
      <Ingredients type="BreadBottom" />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients
  };
};

export default connect(mapStateToProps)(Burger);
