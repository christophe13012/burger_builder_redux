import React from "react";

const Order = props => {
  let burgerPrice = 0;
  props.ingredients.map(igd => {
    return (burgerPrice +=
      props.ingredientsPrices[igd.ingredient] * igd.quantity);
  });
  return (
    <div>
      <p>Détail des ingredients :</p>
      <ul className="list-group">
        {props.ingredients.map(igd => {
          return (
            <li key={igd.ingredient} className="list-group-item">
              {igd.ingredient} :
              <span className="badge badge-pill badge-primary ml-1 mr-1">
                {igd.quantity}
              </span>
              pièces
              <span className="badge badge-secondary ml-3">
                {props.ingredientsPrices[igd.ingredient] * igd.quantity} €
              </span>
            </li>
          );
        })}
      </ul>
      <p style={{ marginTop: 10, marginBottom: 0 }}>
        Prix du burger :
        <span className="badge badge-secondary ml-3">{burgerPrice} €</span>
      </p>
    </div>
  );
};

export default Order;
