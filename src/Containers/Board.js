import React from "react";
import { connect } from "react-redux";
import { addIngredient, supIngredient } from "./../Store/actions";

const Board = props => {
  let ingredients = [];
  for (let key in props.ingredients) {
    for (let i = 0; i < props.ingredients[key]; i++) {
      ingredients.push(key);
    }
  }
  return (
    <div className="container rounded" style={styles.container}>
      <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
        Composez votre burger
      </h1>
      {Object.keys(props.ingredients).map(ingredient => {
        return (
          <div key={ingredient} className="row  justify-content-center mb-2">
            <div className="col-6">
              <p className="float-right">
                {" "}
                {ingredient}{" "}
                <span className="badge badge-secondary ml-3">
                  {props.ingredientsPrices[ingredient]} €
                </span>
              </p>
            </div>
            <div className="col-6">
              <p className="float-left">
                <button
                  onClick={() => props.addIngredient(ingredient)}
                  className="btn btn-sm btn-success"
                >
                  Ajouter
                </button>
                <button
                  disabled={props.ingredients[ingredient] < 1 ? true : false}
                  onClick={() => props.supIngredient(ingredient)}
                  className="btn btn-sm btn-danger ml-2"
                >
                  Supprimer
                </button>
              </p>
            </div>
          </div>
        );
      })}
      <button
        disabled={ingredients.length < 1 ? true : false}
        onClick={props.click}
        className="btn btn-primary mt-3"
      >
        Valider
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    ingredientsPrices: state.ingredientsPrices
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredient: igd => dispatch(addIngredient(igd)),
    supIngredient: igd => dispatch(supIngredient(igd))
  };
};

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#2E2E2E",
    color: "white"
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Board);
