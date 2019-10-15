import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import axios from "axios";
import OrderItem from "../Components/OrderItem";
import { toast } from "react-toastify";
import { eraseBurger, deleteOrder } from "./../Store/actions";

class Checkout extends Component {
  handleOrder = async order => {
    localStorage.removeItem("ingredients");
    localStorage.removeItem("orders");
    try {
      const ordersOjb = {
        user: this.props.userInfos.email,
        orders: [...this.props.orders]
      };
      await axios.post(
        "https://burgerredux.firebaseio.com/orders.json",
        ordersOjb
      );
      toast.success(
        <div>Simulation Paiement et validation de la commande</div>
      );
      setTimeout(() => {
        window.location.replace("/");
      }, 4700);
    } catch (error) {}
  };
  handleConnect = () => {
    localStorage.setItem("ingredients", JSON.stringify(this.props.ingredients));
    localStorage.setItem("orders", JSON.stringify(this.props.orders));
    this.props.history.replace("/login");
  };
  handleRedirect = () => {
    localStorage.removeItem("ingredients");
    this.props.eraseBurger();
    this.props.history.replace("/");
  };
  handleDeleteOrder = index => {
    this.props.deleteOrder(index);
  };
  render() {
    let totalPrice = 0;
    this.props.orders.map(order => {
      return order.map(igd => {
        return (totalPrice +=
          this.props.ingredientsPrices[igd.ingredient] * igd.quantity);
      });
    });
    const email = this.props.userInfos.email;
    return (
      <div style={{ textAlign: "left", padding: 30 }}>
        {this.props.orders.length === 0 ? (
          <React.Fragment>
            <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
              Aucun burger validé
            </h1>
            <NavLink to="/burger_builder" className="btn btn-primary">
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
                  <OrderItem
                    key={index}
                    index={index}
                    order={order}
                    ingredientsPrices={this.props.ingredientsPrices}
                    showDelete
                    onDeleteOrder={this.handleDeleteOrder}
                  />
                );
              })}
            </ul>
            <p style={{ marginTop: 10, marginBottom: 0 }}>
              Montant de la commande :
              <span className="badge badge-secondary ml-3">{totalPrice} €</span>
            </p>
            <button
              className="btn btn-primary mt-3"
              onClick={this.handleRedirect}
            >
              Ajouter un autre burger
            </button>
            {email === undefined ? (
              <button
                className="btn btn-success mt-3 ml-3"
                onClick={this.handleConnect}
              >
                Se connecter pour commander
              </button>
            ) : (
              <button
                className="btn btn-success mt-3 ml-3"
                onClick={this.handleOrder}
              >
                Valider et procéder au paiement
              </button>
            )}
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    ingredientsPrices: state.ingredientsPrices,
    userInfos: state.userInfos,
    ingredients: state.ingredients
  };
};

const mapDispatchToProps = dispatch => {
  return {
    eraseBurger: () => dispatch(eraseBurger()),
    deleteOrder: payload => dispatch(deleteOrder(payload))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout);
