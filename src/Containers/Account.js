import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import OrderItem from "../Components/OrderItem";

class Account extends Component {
  state = { data: {} };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token === null) {
      this.props.history.push("/login");
    }
    try {
      const response = await axios.get(
        "https://burgerredux.firebaseio.com/orders.json"
      );
      this.setState({ data: response.data });
    } catch (error) {
      console.log(error);
    }
  }
  render() {
    const email = this.props.userInfos.email;
    const arrOrders = [];
    for (let key in this.state.data) {
      if (this.props.userInfos.email === this.state.data[key].user) {
        arrOrders.push(this.state.data[key].orders);
      }
    }
    return (
      <div style={{ textAlign: "left", padding: 30 }}>
        <h1 className="display-4 mt-3 mb-4" style={{ fontSize: 28 }}>
          Voici les infos de votre compte :
        </h1>
        <p>Adresse mail : {email}</p>
        <p>Récapitulatif des commandes :</p>
        <ul>
          {arrOrders.map((orders, index) => {
            return (
              <li key={index} className="list-group-item">
                <p className="btn btn-primary">
                  Commande numéro
                  <span className="badge badge-light ml-2">{index + 1}</span>
                  <span className="sr-only">unread messages</span>
                </p>
                <ul>
                  {orders.map((order, index) => {
                    return (
                      <OrderItem
                        key={index}
                        index={index}
                        order={order}
                        ingredientsPrices={this.props.ingredientsPrices}
                      />
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userInfos: state.userInfos,
    ingredientsPrices: state.ingredientsPrices
  };
};

export default connect(mapStateToProps)(Account);
