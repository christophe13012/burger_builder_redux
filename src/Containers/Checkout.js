import React, { Component } from "react";
import { connect } from "react-redux";
import Order from "../Components/Order";
import { NavLink, Link } from "react-router-dom";

class Checkout extends Component {
  render() {
    let totalPrice = 0;
    this.props.orders.map(order => {
      return order.map(igd => {
        return (totalPrice +=
          this.props.ingredientsPrices[igd.ingredient] * igd.quantity);
      });
    });
    return (
      <div style={{ textAlign: "left", padding: 30 }}>
        {this.props.orders.length === 0 ? (
          <React.Fragment>
            <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
              Aucun burger validé
            </h1>
            <NavLink className="btn btn-primary" to="/burger_builder">
              Construire un burger
            </NavLink>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
              Voici le détail de votre commande :
            </h1>
            <ul className="list-group">
              {this.props.orders.map((order, index) => {
                return (
                  <li
                    key={index}
                    className="list-group-item list-group-item-dark"
                  >
                    <p className="btn btn-primary">
                      Burger
                      <span className="badge badge-light ml-2">
                        {index + 1}
                      </span>
                      <span className="sr-only">unread messages</span>
                    </p>
                    <Order
                      ingredients={order}
                      ingredientsPrices={this.props.ingredientsPrices}
                    />
                  </li>
                );
              })}
            </ul>
            <p style={{ marginTop: 10, marginBottom: 0 }}>
              Montant de la commande :
              <span className="badge badge-secondary ml-3">{totalPrice} €</span>
            </p>
            <Link to="/" className="btn btn-primary mt-3">
              Ajouter un autre burger
            </Link>
            <button className="btn btn-success mt-3 ml-3">
              Valider et procéder au paiement
            </button>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    ingredientsPrices: state.ingredientsPrices
  };
};

export default connect(mapStateToProps)(Checkout);
