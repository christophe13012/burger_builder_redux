import React from "react";
import Order from "../Components/Order";

const OrderItem = ({ index, order, ingredientsPrices }) => {
  return (
    <li key={index} className="list-group-item list-group-item-dark">
      <p className="btn btn-primary">
        Burger
        <span className="badge badge-light ml-2">{index + 1}</span>
        <span className="sr-only">unread messages</span>
      </p>
      <Order ingredients={order} ingredientsPrices={ingredientsPrices} />
    </li>
  );
};

export default OrderItem;
