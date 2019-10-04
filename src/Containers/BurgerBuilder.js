import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Board from "./Board";
import ModalComponent from "../Components/ModalComponent";
import { connect } from "react-redux";
import { AddOrder, saveUserInfos } from "./../Store/actions";
import axios from "axios";

class BurgerBuilder extends Component {
  state = { show: false };
  async componentDidMount() {
    const token = localStorage.getItem("token");
    if (token !== null) {
      const response = await axios.get(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfWM4xAXaIT7wpWcpU_jPN0OiC4gWoE1w",
        token
      );
    }
  }
  handleCloseModal = () => {
    this.setState({ show: false });
  };
  handleShowModal = () => {
    this.setState({ show: true });
  };
  handleValid = () => {
    this.handleCloseModal();
    this.props.AddOrder();
    this.props.history.push("/checkout");
  };
  render() {
    return (
      <div>
        <Burger />
        <Board click={this.handleShowModal} />
        <ModalComponent
          show={this.state.show}
          close={this.handleCloseModal}
          valid={this.handleValid}
        />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    AddOrder: () => dispatch(AddOrder()),
    saveUserInfos: userInfos => dispatch(saveUserInfos(userInfos))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BurgerBuilder);
