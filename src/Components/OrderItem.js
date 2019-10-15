import React from "react";
import Order from "../Components/Order";

const OrderItem = ({
  index,
  order,
  ingredientsPrices,
  showDelete,
  onDeleteOrder
}) => {
  return (
    <li key={index} className="list-group-item list-group-item-dark">
      <div>
        <p className="btn btn-primary mt-3">
          Burger
          <span className="badge badge-light ml-3">{index + 1}</span>
        </p>
        {showDelete && (
          <button
            onClick={() => onDeleteOrder(index)}
            style={{ marginTop: 2 }}
            className="btn btn-danger ml-2 mt-0"
          >
            Supprimer
          </button>
        )}
      </div>
      <Order ingredients={order} ingredientsPrices={ingredientsPrices} />
    </li>
  );
};

export default OrderItem;
