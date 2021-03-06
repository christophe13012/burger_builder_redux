import React, { Component } from "react";
import Burger from "./Burger/Burger";
import Board from "./Board";
import ModalComponent from "../Components/ModalComponent";
import { AddOrder } from "./../Store/actions";
import { connect } from "react-redux";

class BurgerBuilder extends Component {
  state = { show: false };
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
    AddOrder: () => dispatch(AddOrder())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(BurgerBuilder);
